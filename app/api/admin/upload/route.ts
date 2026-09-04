import { getCmsAdminUser } from "@/lib/supabase/auth";
import { createSupabaseAdminClient } from "@/lib/supabase/admin";

const bucketName = "shef-media";
const maxBytes = 12 * 1024 * 1024;
const allowedMimeTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: Request) {
  const user = await getCmsAdminUser();
  if (!user) return Response.json({ error: "Sign in with an approved CMS account." }, { status: 401 });

  const formData = await request.formData();
  const file = formData.get("file");
  if (!(file instanceof File)) return Response.json({ error: "Choose an image to upload." }, { status: 400 });
  if (!allowedMimeTypes.includes(file.type)) return Response.json({ error: "Use a JPG, PNG, WebP, or GIF image." }, { status: 400 });
  if (file.size > maxBytes) return Response.json({ error: "Images must be smaller than 12 MB." }, { status: 400 });

  const supabase = createSupabaseAdminClient();
  const bucket = await supabase.storage.createBucket(bucketName, {
    public: true,
    fileSizeLimit: `${maxBytes}b`,
    allowedMimeTypes,
  });
  if (bucket.error && !/already exists|duplicate/i.test(bucket.error.message)) {
    return Response.json({ error: bucket.error.message }, { status: 500 });
  }

  const extension = file.type.split("/")[1]?.replace("jpeg", "jpg") ?? "jpg";
  const path = `gallery/${crypto.randomUUID()}.${extension}`;
  const upload = await supabase.storage.from(bucketName).upload(path, await file.arrayBuffer(), {
    cacheControl: "31536000",
    contentType: file.type,
    upsert: false,
  });
  if (upload.error) return Response.json({ error: upload.error.message }, { status: 500 });

  const { data } = supabase.storage.from(bucketName).getPublicUrl(path);
  return Response.json({ url: data.publicUrl });
}
