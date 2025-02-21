import { getPlaiceholder } from "plaiceholder"
import type { ImageProps } from "next/image"

export async function getBlurDataURL(src: string): Promise<string> {
    try {
        if (src.startsWith("data:")) return src

        const buffer = await fetch(src).then(async (res) => Buffer.from(await res.arrayBuffer()))

        const { base64 } = await getPlaiceholder(buffer)
        return base64
    } catch (err) {
        return "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQtJSEkMjU1LC0yOi4xPUBAQDo2Oj06MS9FRUVHSU1PS0tPWlpgYFr/2wBDAR"
    }
}

export async function getOptimizedImage(src: string, props?: Partial<ImageProps>): Promise<ImageProps> {
    return {
        src,
        alt: props?.alt || "",
        width: props?.width || 1200,
        height: props?.height || 630,
        blurDataURL: await getBlurDataURL(src),
        placeholder: "blur",
        ...props,
    }
}

