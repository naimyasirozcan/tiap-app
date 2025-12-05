import { ClimbingBoxLoader } from 'react-spinners'

function Loading() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center">
      <ClimbingBoxLoader 
        color="#000000" 
        size={15}
      />
    </div>
  )
}

export default Loading