import { useRef } from "react";
import styles from "./Upload.module.css";
import Image from "next/image";

interface UploadProps {
  files: File[];
  setFiles: (next: File[]) => void;
}

export default function Upload({ files, setFiles }: UploadProps) {
  const refContainer = useRef<HTMLInputElement>(null);

  const handleClick = () => {
    refContainer.current?.click();
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const selectedFiles = Array.from(event.target.files);
      setFiles([...files, ...selectedFiles]);
    }
  };
  return (
    <>
      <div className={styles.wrapper} onClick={handleClick}>
        <input
          onChange={handleChange}
          multiple
          ref={refContainer}
          type="file"
          accept="image/*"
          hidden
        />
        <p>📷 Нажмите для загрузки изображений</p>
      </div>

      {files.length > 0 && (
        <div className={styles.files}>
          {files.map((file, index) => {
            const imageUrl = URL.createObjectURL(file);
            return (
              <div key={index} className={styles.file}>
                <Image
                  fill
                  src={imageUrl}
                  alt={file.name}
                  className={styles.image}
                  onLoad={() => {
                    URL.revokeObjectURL(imageUrl);
                  }}
                />
              </div>
            );
          })}
        </div>
      )}
    </>
  );
}
