export default function Content(){
    return(
        <main className="w-screen text-center">
            <div className="text-5xl font-extrabold ...">
  <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
    @Room Contents
  </span>
            </div>
            <form>
                <div className="mt-10">
                <textarea className="mb-3 w-1/3 h-40 bg-amber-100">

                </textarea>
                </div>
                <button type="submit" className="bg-blue-300 font-bold text-white">글 작성</button>
            </form>
        </main>
    );
}