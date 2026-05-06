# Video Not Playing on AWS Amplify - Fix Explanation

## Problem
Video shows blue background (#172554) instead of playing after deployment to AWS Amplify, but works fine locally.

## Root Cause
The video paths were using absolute paths (`/Video/...`) which don't work correctly in AWS Amplify deployment because:
1. React apps need to use `process.env.PUBLIC_URL` for proper path resolution
2. AWS Amplify serves files from a different base path than local development

## The Fix (MINIMAL - No Layout Changes)

### Changed in `src/components/HomePage.jsx`:
```javascript
// BEFORE (doesn't work on AWS Amplify):
<source src="/Video/Branchwork Website_V03.webm" type="video/webm" />
<source src="/Video/video_2.mp4" type="video/mp4" />

// AFTER (works everywhere):
<source src={`${process.env.PUBLIC_URL}/Video/video_2.mp4`} type="video/mp4" />
<source src={`${process.env.PUBLIC_URL}/Video/Branchwork Website_V03.webm`} type="video/webm" />
```

### What Changed:
1. ✅ Added `${process.env.PUBLIC_URL}` prefix to video paths
2. ✅ Reordered sources: MP4 first (better browser compatibility)
3. ❌ NO CSS changes
4. ❌ NO layout changes
5. ❌ NO styling changes

## Why This Works
- `process.env.PUBLIC_URL` automatically resolves to the correct base path
- In local development: resolves to empty string or "/"
- In AWS Amplify: resolves to the correct deployment path
- This is the standard React way to reference public assets

## Testing After Deployment
1. Open browser console (F12)
2. Go to Network tab
3. Filter by "media" or search for "video"
4. You should see:
   - Status: 200 (not 404)
   - Type: video/mp4 or video/webm
   - Size: actual file size (not 0)

## If Still Not Working
Check these in AWS Amplify Console:
1. Build logs - ensure Video folder is copied to build
2. Check if video files are too large (AWS Amplify has limits)
3. Try accessing video directly: `https://your-domain.com/Video/video_2.mp4`
4. Check browser console for specific error messages

## Important Notes
- This fix does NOT change any CSS
- This fix does NOT change any layout
- This fix does NOT change video styling
- This is ONLY a path resolution fix
- The blue background is the CSS fallback color - it will disappear when video loads
