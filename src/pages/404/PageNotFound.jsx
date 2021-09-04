import { Link } from "react-router-dom"

const PageNotFound = () => {
    return (
        <div className="min-h-screen">
          <section className="flex items-center p-16 text-gray-800">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8">
		<div className="max-w-md text-center">
			<h2 className="mb-8 font-extrabold text-9xl text-gray-400">
				<span className="sr-only">Error </span>404 
			</h2>
			<p className="text-2xl font-semibold mb-10 md:text-3xl text-gray-600">Lo sentimos, no hemos podido encontrar esta página.</p>
			
			<Link to="/" className="px-4 py-3 font-semibold justify-center rounded flex  bg-green-600 text-gray-50">Regresar a la pagina principal</Link>
		</div>
	</div>
</section>
        </div>
    )
}

export default PageNotFound
