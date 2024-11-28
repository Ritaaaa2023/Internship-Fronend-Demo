import Header from "../components/common/Header";
import ImageCapturePage from "../components/ImageCapturePage";

const ScanItemPage = () => {
  return (
    <div>
      <div className="flex-1 overflow-auto relative z-10">
        <Header title="Quick Scan" />
      </div>

      <div className="flex-1 overflow-auto relative z-10">
        <ImageCapturePage />
      </div>
    </div>
  );
}

export default ScanItemPage