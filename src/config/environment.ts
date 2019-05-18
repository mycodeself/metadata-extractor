const defaultPort = 4000;
const defaultUploadDir = 'tmp'

interface Environment {
    port: number | string,
    uploadDir: string,
}

const environment: Environment = {
    port: process.env.PORT || defaultPort,
    uploadDir: process.env.uploadDir || defaultUploadDir
};

export default environment