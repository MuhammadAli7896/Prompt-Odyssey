"use client"
const error = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='blue_gradient text-center' style={{ fontSize: "45px" }}>
                Error Ocurred
                <br className='max-md:hidden' />
                <span className='orange_gradient text-center'> Something went wrong</span>
            </h1>
            <p className='desc text-center'>
                We apologize for any inconvenience caused
            </p>
        </section>
    )
}

export default error