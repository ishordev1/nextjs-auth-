import Image from 'next/image'


const page = () => {
  return (
   <>
    <div>this  is product slug page</div>
    <Image src="/img/img.jpg" alt="Product Image" width={500} height={500} />
   </>
  )
}

export default page