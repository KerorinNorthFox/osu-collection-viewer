export function arrayBufferToJson(arrayBuffer: ArrayBuffer) {
  const uInt8Array = new Uint8Array(arrayBuffer);
  return { data: Array.from(uInt8Array) };
}

export function readFileAsArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        resolve(reader.result);
      } else {
        reject(new Error("Failed to read file as ArrayBuffer"));
      }
    };
    reader.onerror = () => {
      reject(reader.error || new Error("Unknown FileReader error"));
    };
    reader.readAsArrayBuffer(file);
  });
}
