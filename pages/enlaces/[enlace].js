import Layout from '../../components/Layout';
import axiosClient from '../../config/axios';

export async function getServerSideProps({ params }) {
    const { enlace } = params
    const response = await axiosClient.get(`/api/enlaces/${enlace}`);
    console.log(response.data)

    return {
        props: {
            enlace: response.data
        }
    }
}

export async function getServerSidePaths() {
    const response = await axiosClient.get('/api/enlaces');

    return {
        paths: response.data.links.map(link => ({
            params: { enlace: link.url }
        })),
        fallback: false
    }
}

export default ({ enlace }) => {
    console.log(enlace)
    return (
        <Layout>
            <h1 className="text-4xl text-center text-gray-600">Descarga tu enlace:</h1>
            <div className="flex items-center justify-center mt-3 text-center">
                <a href={`${process.env.backendURL}/api/archivos/${enlace.file}`} className="bg-green-600 hover:bg-green-500 w-64 p-2 text-white font-bold cursor-pointer mt-10 rounded-full">Aquí</a>
            </div>
        </Layout>
    );
}