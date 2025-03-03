export default function ErrorMessage({ message }) { 
  return (
    <p className="bg-red-600 p-2 text-center text-white uppercase text-sm font-bold rounded-md">
      {message} 
    </p>
  );
}