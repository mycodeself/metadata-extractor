import { exec } from "child_process";
import util from 'util';

const execPromisify = util.promisify(exec);

const METADATA_EXLCLUDED = ['file_name', 'directory'];

export interface ExifMetadata {
    name: string,
    key: string,
    value: string,
}

export async function extractMetadata(filePath: string): Promise<ExifMetadata[]|null> {
    let metadata: ExifMetadata[]|null = null;
    const { stdout, stderr } = await execPromisify(`exiftool "${filePath}"`);
    
    if(stderr || !stdout) {
        console.error(stderr)
        return null;
    }

    metadata = parseStdout(stdout);

    return filterMetadata(metadata);
}

function parseStdout(stdout: string): ExifMetadata[] {
    const lines = stdout.split('\n');
    
    lines.pop();

    const metadata: ExifMetadata[] = lines.map(line => {
        const meta = line.split(/:(.+)/, 2);
        return {
            key: meta[0].trim().toLowerCase().replace(/[\W_]+/g, '_'),
            name: meta[0].trim(),
            value: meta[1].trim()
        }
    });

    return metadata;
}

function filterMetadata(metadata: ExifMetadata[]): ExifMetadata[] {
    return metadata.filter((value: ExifMetadata) => {
        return !METADATA_EXLCLUDED.includes(value.key);
    });
}