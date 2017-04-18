function createEmoji(text, emoji) {
    return {
        text: text,
        emoji: emoji
    }
}

var emojis = [
   createEmoji(":smile:", "😀"),
   createEmoji(":scream:", "😱"),
   createEmoji(":heartFace:", "😍"),
   createEmoji(":sleep:","😴"),
   createEmoji(":smirk:", "😏"),
   createEmoji(":angry:", "😡"),
   createEmoji(":poop:", "💩"),
   createEmoji(":XD:", "😝"),
   createEmoji(":kissy:", "😘"),
   createEmoji(":tears:", "😭"),
   createEmoji(":sick:", "😷"),
   createEmoji(":heart:", "❤️"),
   createEmoji(":heartbroken:", "💔"),
   createEmoji(":!:", "❗"),
   createEmoji(":dead:", "💀"),
   createEmoji(":unamused:", "😑"),
   createEmoji(":bugEyes:", "😶")
]

function replace (text) {
    for (var item of emojis) {
        text = text.replace(item.text, item.emoji)
    }
    return text;
}

module.exports.replace = replace;