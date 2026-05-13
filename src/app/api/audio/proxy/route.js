export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");
    const rangeHeader = request.headers.get("range");

    if (!url) {
      return new Response("URL parameter is required", { status: 400 });
    }

    // URL decode
    const decodedUrl = decodeURIComponent(url);

    // S3 URL'sini kontrol et
    if (!decodedUrl.includes("s3")) {
      return new Response("Invalid URL", { status: 400 });
    }

    // S3'ten dosyayı indir
    const response = await fetch(decodedUrl, {
      headers: rangeHeader ? { Range: rangeHeader } : {},
    });

    if (!response.ok) {
      return new Response(`Failed to fetch audio: ${response.statusText}`, {
        status: response.status,
      });
    }

    const contentType = response.headers.get("Content-Type") || "audio/mpeg";
    const contentLength = response.headers.get("Content-Length");

    // Range request handling
    if (response.status === 206 && rangeHeader) {
      // Partial content
      return new Response(response.body, {
        status: 206,
        headers: {
          "Content-Type": contentType,
          "Content-Length":
            response.headers.get("Content-Length") || contentLength,
          "Content-Range": response.headers.get("Content-Range") || "",
          "Accept-Ranges": "bytes",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Access-Control-Expose-Headers":
            "Content-Length, Content-Range, Accept-Ranges",
          "Cache-Control": "public, max-age=86400",
        },
      });
    }

    // Full content
    return new Response(response.body, {
      status: 200,
      headers: {
        "Content-Type": contentType,
        "Content-Length": contentLength || "",
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers":
          "Content-Length, Content-Range, Accept-Ranges",
        "Cache-Control": "public, max-age=86400",
      },
    });
  } catch (error) {
    console.error("Audio proxy error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function HEAD(request) {
  try {
    const { searchParams } = new URL(request.url);
    const url = searchParams.get("url");

    if (!url) {
      return new Response("URL parameter is required", { status: 400 });
    }

    const decodedUrl = decodeURIComponent(url);

    if (!decodedUrl.includes("s3")) {
      return new Response("Invalid URL", { status: 400 });
    }

    const response = await fetch(decodedUrl, {
      method: "HEAD",
    });

    return new Response(null, {
      status: response.status,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "audio/mpeg",
        "Content-Length": response.headers.get("Content-Length") || "0",
        "Accept-Ranges": "bytes",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Access-Control-Expose-Headers":
          "Content-Length, Content-Range, Accept-Ranges",
      },
    });
  } catch (error) {
    console.error("HEAD request error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Range",
      "Access-Control-Expose-Headers":
        "Content-Length, Content-Range, Accept-Ranges",
    },
  });
}
