import { useState } from "react";

const Link = () => {
  const [link, setLink] = useState("");
  const [title, setTitle] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!link || link === "") return;
    if (!title || title === "") return;

    const result = `ffmpeg -user_agent "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.87 Safari/537.36" -headers "referer: https://kr32.sogirl.so/" -i "${link}" -c copy "${title.replaceAll(
      " ",
      "_"
    )}.mp4"`;

    try {
      await window.navigator.clipboard.writeText(result);
    } catch (error) {
      console.log(error);
    }
    alert(`${title} is copied to clipboard!`);
    setLink("");
    setTitle("");
  };
  return (
    <div className="w-full h-screen bg-black flex justify-center items-center">
      <div className="max-w-screen-md w-full h-[50vh] p-5 px-20 bg-slate-300 rounded-3xl">
        <form
          onSubmit={handleSubmit}
          className="w-full h-full flex flex-col justify-center items-center gap-5"
        >
          <input
            value={link}
            onChange={(e) => setLink(e.target.value)}
            className="w-full p-3 outline-none rounded-2xl"
            type={"text"}
            required
            placeholder="Link"
          />
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-3 outline-none rounded-2xl"
            type={"text"}
            required
            placeholder="Title"
          />
          <button className="w-full p-3 bg-black text-white font-semibold rounded-2xl">
            submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Link;
