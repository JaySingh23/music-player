
function Song({song, onSelect}) {
    const coverImage = `https://cms.samespace.com/assets/${song.cover}`

  return (
    <div className="w-full h-auto mt-6 flex items-center justify-between bg-transparent cursor-pointer" onClick={onSelect}>
        <div className="flex items-start justify-center">
            <img src = {coverImage} 
                 alt='cover-image' 
                 className="w-10 h-10 object-cover rounded-full mr-2" />
            <div className="font-inter flex flex-col justify-start">
                <h3 className="text-gray-100 text-sm tracking-wide">{song.name}</h3>
                <p className="text-gray-100 opacity-75 text-xs">{song.artist}</p>
            </div>
        </div>
        <p className="text-gray-100 opacity-75 text-sm">4:16</p>
    </div>
  )
}

export default Song