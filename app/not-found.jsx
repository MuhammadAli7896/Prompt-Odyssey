const notFound = () => {
    return (
        <section className='w-full flex-center flex-col'>
            <h1 className='blue_gradient text-center' style={{fontSize: "45px"}}>
                Page not found
                <br className='max-md:hidden' />    
                <span className='orange_gradient text-center'></span>
            </h1>
            <p className='desc text-center'>
                Your URL might be wrong. Please try again
            </p>
        </section>
    )
}

export default notFound