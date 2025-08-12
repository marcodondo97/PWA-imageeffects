# Image Effects

## Introduction
A modern, mobile-first PWA to apply visual filters to photos directly in the browser using the Canvas API. Built with Bootstrap 5, vanilla JS, and a Service Worker for offline support.

## Description
Image Effects lets users quickly upload an image, preview it, apply preset visual effects (blur, sepia, brightness, contrast, black & white, hue rotate, invert, opacity, saturate), and download the result as a PNG with a timestamped filename. The UI is optimized for small screens with a bottom action bar and an effects bottom sheet, avoiding horizontal scrolling and ensuring a smooth, professional experience.

- Tech stack: HTML5 Canvas, Bootstrap 5, ES5/vanilla JS, Service Worker, Web App Manifest
- PWA features: offline-ready, installable (browser-managed prompt), proper icons/manifest
- UX highlights: mobile-first layout, accessible controls, disabled states until image load, reset focus handling

# Getting Started
1. Serve the project root over HTTP/HTTPS (do not open via `file://`).
2. Open `index.html` in a modern browser (Chrome, Edge, Safari, Firefox).
3. Upload an image, open the effects sheet, apply filters, and download the result.

- Icons are referenced from `icons/`.
- Service worker and manifest are configured in the project root.

## Deploy

AWS S3 is a highly available object storage service that can also host static websites. For a static PWA like this (HTML/CSS/JS only), zero servers to manage, low cost, automatic scaling, and simple integration with CI/CD.

1. Prerequisites
   - Install and configure AWS CLI
   - Have this repository on GitHub and locally cloned.

2. Create an S3 bucket for static website hosting
   - Bucket name must be lowercase and globally unique. 
   - Create the bucket and enable website hosting (CLI):
```bash
aws s3api create-bucket --bucket pwa-imageeffects --region eu-west-1 \
  --create-bucket-configuration LocationConstraint=eu-west-1
aws s3 website s3://pwa-imageeffects --index-document index.html --error-document index.html
```

3. Allow public read access (so the website is viewable)
   - Disable public access block at bucket level and attach a public-read policy:
```bash
aws s3api put-public-access-block --bucket pwa-imageeffects \
  --public-access-block-configuration '{"BlockPublicAcls":false,"IgnorePublicAcls":false,"BlockPublicPolicy":false,"RestrictPublicBuckets":false}'
cat > bucket-policy.json << 'JSON'
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": "*",
      "Action": ["s3:GetObject"],
      "Resource": ["arn:aws:s3:::pwa-imageeffects/*"]
    }
  ]
}
JSON
aws s3api put-bucket-policy --bucket pwa-imageeffects --policy file://bucket-policy.json
```

4. Set up CI/CD with GitHub Actions
   - This repo includes `.github/workflows/deploy.yml` that deploys on every push to `main`.
   - Create an IAM role for GitHub OIDC and grant S3 permissions (write to the bucket).
   - Add a repository secret named `AWS_OIDC_ROLE_ARN` with the IAM role ARN.
   - Push to `main` to trigger the pipeline; it will sync files and apply the correct cache headers.


## Userflow
<div align="left">
<table>
  <tr>
    <td><img src="docs/img/imageeffects-usage.gif" alt="imageeffects User Flow" width="200"/></td>
  </tr>
</table>
</div>

