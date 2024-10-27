import { Editor } from "@/types";
import ToolSidebarHeader from "./ToolSidebarHeader";
import { useGetImages } from "../../hooks/useGetImages";
import { AlertTriangle, Loader } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

interface ImageSidebarProps {
  editor: Editor | undefined;
}

const ImageSidebar = ({ editor }: ImageSidebarProps) => {
  const { data, isLoading, isError } = useGetImages();
  console.log(data);
  return (
    <>
      <ToolSidebarHeader title="Image" description="Modify the image" />
      {isLoading && (
        <div className="flex items-center justify-center flex-1 h-[200px]">
          <div className="flex flex-col items-center gap-y-2">
            <Loader className="size-8 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading images...</p>
          </div>
        </div>
      )}
      {isError && (
        <div className="flex flex-col gap-y-4 items-center justify-center flex-1 h-[200px] bg-red-50 rounded-md m-4 p-4">
          <AlertTriangle className="size-8 text-red-500" />
          <div className="text-center">
            <p className="text-red-700 font-semibold">Failed to fetch images</p>
            <p className="text-red-600 text-sm mt-1">
              Please try again later or check your internet connection.
            </p>
          </div>
        </div>
      )}
      <ScrollArea>
        <div className="p-4 h-[calc(100vh-145px)]">
          <div className="grid grid-cols-2 gap-2">
            {data &&
              data.map((image) => {
                return (
                  <div
                    key={image.id}
                    className="relative group cursor-pointer hover:shadow-lg transition-shadow duration-300 rounded-md overflow-hidden"
                  >
                    <img
                      src={image?.urls?.small || image?.urls?.thumb}
                      alt={image.alt_description || "Image"}
                      className="w-full h-32 object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity duration-300 flex items-center justify-center">
                      <button
                        onClick={() => editor?.addImage(image.urls.regular)}
                        className="bg-white text-black px-3 py-1 rounded-full text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      >
                        Add
                      </button>
                    </div>
                    <Link
                      target="_blank"
                      href={image.links.html}
                      className="absolute left-0 bottom-0 w-full text-xs text-white p-2 bg-gradient-to-t from-black to-transparent"
                    >
                      <span className="line-clamp-1">{image.user.name}</span>
                    </Link>
                  </div>
                );
              })}
          </div>
        </div>
      </ScrollArea>
    </>
  );
}

export default ImageSidebar