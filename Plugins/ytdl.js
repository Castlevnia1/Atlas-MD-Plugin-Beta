const YT = require("../System/Ytdl-Core.js");
const fs = require("fs");
const yts = require("youtube-yts");
const ffmpeg = require("fluent-ffmpeg");
const {
    fetchJson,
    getBuffer,
    GIFBufferToVideoBuffer,
} = require("../System/Function2.js");

let mergedCommands = ["play", "song", "ytmp3", "mp3", "ytmusic", "ytaudio", "yta", "ytmp4", "mp4", "ytvideo","ytv", "video"];

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

                ttt = `*${song.title}*   _Downloading_ ...`
                await reply(ttt);

                yts({ videoId }).then((result) => {
                    var vlength = result.seconds;
                    if (vlength >= 1800) {
                        return m.reply(
                          "Command Rejected! The audio is more than 30 minutes long !"
                        );
                      }
                    
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
            case "mp3":
                if (!text || !text.includes("youtube.com/watch?v=") && !text.includes("youtu.be/")) {
                    await doReact("❌");
                    return reply(`Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp3 put_link*`);
                }
                await doReact("📥");
                videoUrl = text;
                videoId = videoUrl.split("v=")[1];

                yts({ videoId }).then((result) => {
                    var vlength = result.seconds;
              
                    if (vlength >= 2700) {
                      return m.reply(
                        "Command Rejected! The audio is more than 45 minutes long BAKA !"
                      );
                    } else {
                      const ytaud =  YT.mp3(text).then((file) => {
                        Atlas.sendMessage(
                          m.from,
                          {
                            audio: fs.readFileSync(file.path),
                            mimetype: "audio/mpeg",
                          },
                          { quoted: m }
                        );
                        fs.unlinkSync(file.path);
                      });
                      
                    }
                  });

                break;

            case "ytmp4":
            case "mp4":
                    if (!text || !text.includes("youtube.com/watch?v=") && !text.includes("youtu.be/")) {
                        await doReact("❌");
                        return reply(`Please provide a valid YouTube Video link to download as audio!\n\nExample: *${prefix}mp4 put_link*`);
                    }
                    await doReact("📥");
                    videoUrl = text;
                    videoId = videoUrl.split("v=")[1];
                
                    yts({ videoId }).then(async (result) => {
                        var vlength = result.seconds;
                
                        if (vlength >= 2700) {
                            return m.reply("Command Rejected! The audio is more than 45 minutes long BAKA!");
                        } else {
                            try {
                                const ytvid = await YT.mp4(text);
                                await Atlas.sendMessage(
                                    m.from,
                                    {
                                        image: { url: ytvid.thumbnail },
                                        caption: ``,
                                        video: { url: ytvid.videoUrl },
                                    },
                                    { quoted: m }
                                );
                            } catch (err) {
                                console.error(err);
                                Atlas.sendMessage(
                                    m.from,
                                    { text: `Failed to play the song: ${err.message}` },
                                    { quoted: m }
                                );
                            }
                        }
                    });
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

                ttt = `*${song.title}*   _Downloading_ ...`
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

                case "yts":
                case "ytsearch":
    if (!args[0]) {
        await doReact("❌");
        return reply(`Please provide a search term!`);   
    }
    await doReact("📥");
    let search = await yts(text);
    let thumbnail = search.all[0].thumbnail;
    let num = 1;

    var txt = `*🏮 YouTube Search Engine 🏮*\n\n_🧩 Search Term:_ *${args.join(" ")}*\n\n*📌 Total Results:* *${search.all.length}*\n`;

    for (let i of search.all) {
        txt += `\n_Result:_ *${num++}*\n_🎀 Title:_ *${i.title}*\n_🔶 Duration:_ *${i.timestamp}*\n_🔷 Link:_ ${i.url}\n\n`;
    }

    let buttonMessage = {
        image: { url: thumbnail },
        caption: txt,
    };

    Atlas.sendMessage(m.from, buttonMessage, { quoted: m });
    break;

            default:
                break;
        }
    },
};
