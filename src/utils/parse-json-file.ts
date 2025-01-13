export async function parseJsonFile<T extends object>(file: File): Promise<T> {
  if (!file.type.includes("text")) {
    throw new Error("Invalid file type. Expected a text file.");
  }

  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.onload = () => {
      try {
        const jsonString = reader.result as string;
        const jsonObject = JSON.parse(jsonString);
        resolve(jsonObject);
      } catch (error) {
        reject(new Error("Failed to parse JSON: " + error.message));
      }
    };

    reader.onerror = () => {
      reject(new Error("Failed to read the file!"));
    };

    reader.readAsText(file);
  });
}
