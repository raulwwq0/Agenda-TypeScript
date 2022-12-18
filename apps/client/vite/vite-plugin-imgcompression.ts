import imagemin from "imagemin";
import imageminPngquant from "imagemin-pngquant";

type CompressorOutput = {
    data: Buffer;
    sourcePath: string;
    destinationPath: string;
};

const compressor = (src: string, dest: string) => {
    return imagemin([src], {
        destination: dest,
        plugins: [
            imageminPngquant({
                quality: [0.6, 0.8],
            }),
        ],
    });
};

const compressorLog = (data: CompressorOutput[]) => {
    console.log(
        "\n########################################  Compressing Images  ######################################## \n"
    );
    for (const file of data) {
        console.log(
            `   Compressed "${file.sourcePath}" to "${file.destinationPath}"`
        );
    }
    console.log(
        "\n########################################  Images Compressed  ######################################### \n"
    );
};

export default ({ src, dest }) => {
    return {
        name: "vite-plugin-imgcompression",
        enforce: "post",
        async closeBundle() {
            compressorLog(await compressor(src, dest));
        },
    };
};
