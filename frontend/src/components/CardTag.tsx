interface tagProps{
    text:string
}

const CardTag = (props:tagProps) => {
  return (
    <div className="rounded-full border w-fit px-2 py-1 bg-purple-400 text-purple-500 text-xs">
        #{props.text}
    </div>
  )
}

export default CardTag
