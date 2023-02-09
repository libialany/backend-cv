const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const {
    S3Client,
    ListObjectsV2Command,
    GetObjectCommand
} = require("@aws-sdk/client-s3");

const S3 = new S3Client({
    region: "auto",
    endpoint: `https://${process.env.ACCOUNT_ID}.r2.cloudflarestorage.com`,
    credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
    },
});
const getImageKeysByUser = async () => {

    const { Contents = [] } = await S3.send(
        new ListObjectsV2Command({ Bucket: process.env.BUCKET_NAME })
    );
    return Contents.sort(
        (a, b) => new Date(b.LastModified) - new Date(a.LastModified)
    ).map((image) => image.Key);
};

const getUserPresignedUrls = async (userId) => {
    try {
        const imageKeys = await getImageKeysByUser(userId);
        const presignedUrls = await Promise.all(
            imageKeys.map((key) => {
                const command = new GetObjectCommand({ Bucket: process.env.BUCKET_NAME, Key: key });
                return getSignedUrl(S3, command, { expiresIn: 900 }); // default
            })
        );

        return  presignedUrls ;
    } catch (error) {
        console.log(error);
        return { error };
    }
};

module.exports = { getImageKeysByUser, getUserPresignedUrls }