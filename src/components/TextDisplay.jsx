// components/ExtractedInfoDisplay.js
export default function ExtractedInfoDisplay({ extractedText, category }) {

  
  return (
    <div className="mt-8 space-y-6 border flex flex-col rounded-md p-2">
      {extractedText && (
        <div className="">
          <h3 className="text-lg font-semibold mb-2">Extracted Text:</h3>
          <p className="p-4 bg-gray-100 rounded overflow-auto max-h-60 text-sm whitespace-pre-wrap">
            {extractedText}
          </p>
        </div>
      )}
      {category && (
          <div className="">
            <h3 className="text-lg font-semibold mb-2">Category:</h3>
            <p className="p-4 bg-gray-100 rounded text-sm">{category}</p>
          </div>
      )}
    </div>
  );
}
     