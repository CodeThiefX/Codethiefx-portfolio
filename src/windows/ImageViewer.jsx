import { WindowControls } from "#components";
import WindowWrapper from "#hoc/WindowWrapper";
import useWindowStore from "#store/window";

const ImageViewer = () => {
  const { windows } = useWindowStore();
  const data = windows.imgfile?.data;

  if (!data) return null;
  const { name, imageUrl } = data;

  return (
    <div className="h-full w-full flex flex-col">
      <div id="window-header">
        <WindowControls target="imgfile" />
        <h2>{name}</h2>
      </div>

      <div className="p-4 bg-white flex-1 overflow-y-auto flex justify-center items-center">
        {imageUrl ? (
          <div className="w-full flex justify-center items-center">
            <img
              src={imageUrl}
              alt={name}
              className="max-w-full max-h-full object-contain rounded"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};

const ImageWindow = WindowWrapper(ImageViewer, "imgfile");

export default ImageWindow;
