const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const {
    fetchJson,
    getBuffer,
    GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = ["play", "song", "ytmp3", "ytmusic", "ytmp4", "ytvideo", "video"];

module.exports = {
    name: "mediaDownloader",
    alias: [...mergedCommands],
    description: "All file dowloader commands",
    start: async (Atlas, m, { inputCMD, text, doReact, prefix, pushName }) => {
        switch (inputCMD) {
            case "play":
            case "song":
                if (!text) {
                    await doReact("❌");
                    return reply(`Please provide a song name !\n\nExample: *${prefix}song despacito*`);
                }
                await doReact("📥");
                //thumbAtlas = fs.readFileSync("./Assets/Atlas.jpg");
                thumbAtlas = "https://graph.org/file/d0a287fa875c809f234ce.jpg";
                songInfo = await yts(text);
                song = songInfo.videos[0];
                videoUrl = song.url;
                videoId = videoUrl.split("v=")[1];

                yts({ videoId }).then((result) => {
                    YT.mp3(videoId).then((file) => {
                        const inputPath = file.path;
                        const outputPath = inputPath + ".opus";

                        ffmpeg(inputPath)
                            .format("opus")
                            .on("error", (err) => {
                                console.error("Error converting to opus:", err);
                            })
                            .on("end", async () => {
                                //const thumbnailBuffer = await getBuffer(song.thumbnail);
                                const thumbnailBuffer = await getBuffer(thumbAtlas);

                                Atlas.sendMessage(
                                    m.from,
                                    {
                                        audio: fs.readFileSync(outputPath),
                                        mimetype: "audio/mpeg",
                                        ptt: true,
                                        contextInfo: {
                                            externalAdReply: {
                                                title: song.title.substr(0, 50),
                                                body: `Downloaded by: ${botName}`,
                                                thumbnail: thumbnailBuffer,
                                                mediaType: 1,
                                                mediaUrl: thumbAtlas,
                                                sourceUrl: song.url,
                                            }
                                        }
                                    },
                                    { quoted: m }
                                );

                                fs.unlinkSync(inputPath);
                                fs.unlinkSync(outputPath);
                            })

                            .save(outputPath);
                    });
                });


                break;

            case "ytmp3":
            case "ytmusic":


                break;

            case "ytmp4":
            case "ytvideo":
                break;

            case "video":
                if (!text) {
                    await doReact("❌");
                    return reply(`Please provide an YouTube video name !\n\nExample: *${prefix}video dandilions*`);
                }
                await doReact("📥");

                songInfo = await yts(text);
                song = songInfo.videos[0];
                videoUrl = song.url;
                videoId = videoUrl.split("v=")[1];
                result = await yts(videoId);

                ttt = `_Downloading:_ *${song.title}*   ...`
                await reply(ttt);

                const ytaud = await YT.mp4(videoUrl);
                Atlas.sendMessage(
                    m.from,
                    {
                        video: { url: ytaud.videoUrl },
                        caption: `${song.title} By: *${botName}*`,
                    },
                    { quoted: m }
                );

                break;

            default:
                break;
        }
    },
};
