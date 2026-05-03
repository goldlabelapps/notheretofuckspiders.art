import { NextResponse } from 'next/server';
import { makeRes, getEndpoints } from '../';

import { getFirebaseAdminApp } from '../lib/firebaseAdmin';
import { getStorage } from 'firebase-admin/storage';

export async function GET() {
    const res = makeRes({
        severity: 'success',
        message: 'Avatars endpoint says hello',
        data: getEndpoints('Avatars'),
    });
    return NextResponse.json(res);
}

export async function POST(request: Request) {
    try {
        // Parse multipart form data
        const contentType = request.headers.get('content-type') || '';
        console.log('[avatars] POST content-type:', contentType);
        if (!contentType.startsWith('multipart/form-data')) {
            console.log('[avatars] POST error: invalid content-type');
            return NextResponse.json(makeRes({ severity: 'error', message: 'Content-Type must be multipart/form-data' }), { status: 400 });
        }

        const formData = await request.formData();
        const file = formData.get('file');
        console.log('[avatars] POST file:', file);
        if (!file || typeof file === 'string') {
            console.log('[avatars] POST error: no file uploaded');
            return NextResponse.json(makeRes({ severity: 'error', message: 'No file uploaded' }), { status: 400 });
        }


        // Sanitize filename to ASCII (replace non-ASCII with '_')
        let rawFilename = file.name || `avatar_${Date.now()}`;
        const filename = rawFilename.replace(/[^\x00-\x7F]/g, '_');
        const mimetype = file.type || 'application/octet-stream';
        console.log('[avatars] POST filename:', filename, 'mimetype:', mimetype);

        // Convert arrayBuffer to Buffer (content is binary, so encoding is not needed)
        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        // Upload to Firebase Storage
        const app = getFirebaseAdminApp();
        const storage = getStorage(app);
        const bucket = storage.bucket();
        console.log('[avatars] POST bucket name:', bucket.name);
        const fileRef = bucket.file(`avatars/${filename}`);
        await fileRef.save(buffer, {
            metadata: { contentType: mimetype },
            public: true,
        });
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/avatars/${filename}`;
        console.log('[avatars] POST uploaded to:', publicUrl);

        return NextResponse.json(makeRes({
            severity: 'success',
            message: 'File uploaded',
            data: { url: publicUrl, name: filename, type: mimetype },
        }));
    } catch (error: any) {
        console.error('[avatars] POST error:', error);
        return NextResponse.json(makeRes({ severity: 'error', message: error.message || 'Upload failed' }), { status: 500 });
    }
}
