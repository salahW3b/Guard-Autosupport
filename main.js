const { Client, Intents, MessageActionRow, MessageButton, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const COMMANDS = {
    1: {
        question: "Comment puis-je obtenir un bot perso ?",
        response: memberId => `Bonjour <@${memberId}>, si vous souhaitez acheter un bot perso, vous pouvez vérifier <#achangerparliddusalondeventedubot> (<https://discord.com/channels/1087447567463362691/1142800418028654642>)`
    },
    2: {
        question: "Pourquoi Guard ne répond pas à +help ?",
        response: memberId => `Bonjour <@${memberId}>, si le bot ne vous répond pas il y a deux raisons possibles :\n1ère Raison : Le bot est off dû à un problème\n2nd raison : Vous n'avez pas les permissions nécessaires.`
    },
    3: {
        question: "Mon token est-il sécurisé ?",
        response: memberId => `Bonjour <@${memberId}>, contrairement à nos concurrents nous avons renforcé nos sécurités et nous encryptons soigneusement tous vos tokens de bot pour éviter tout risque.\n\nToken non encrypté: \`OTA2MjM0NDY0NzcyOTc2Nzcx.YYVqnQ.Q5pJOYrARO7N2rQy16_Xq5LeODQ\`\nToken encrypté: \`U2FsdGVkX1+XawM84mUxO3XxVCOU6V2/m9JhYlEvu+9Vxn6aouvMrQxIx5kM5jduurXifmK2vt8N248gnMIBntXYZWvi1QoCLF7n6w+EWd8=\``
    },
    4: {
        question: "Comment puis-je inviter le bot Guard ?",
        response: memberId => `Bonjour <@${memberId}>, pour inviter le bot, il suffit de cliquer sur ce lien :\nhttps://discord.com/api/oauth2/authorize?client_id=1080039548651839578&permissions=8&scope=bot%20applications.commands`
    },
    5: {
        question: "Pourquoi le bot est-il dans les commandes slash ?",
        response: memberId => `Bonjour <@${memberId}>, nous devons demander un accès à Discord pour pouvoir avoir accès au contenu des messages.`
    },
    6: {
        question: "Mon problème n'est pas dans la liste ?",
        response: memberId => `Bonjour <@${memberId}>, si votre question ne figure pas dans cette liste, mentionnez un membre du staff dans le chat ou créez un ticket (<#1142798116207198278>).`
    },
};

client.once('ready', () => {
    console.log('Bot ready');
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isButton()) return;

    const member = interaction.user;

    const command = COMMANDS[interaction.customId];
    if (command) {
        interaction.reply({ content: command.response(member.id), ephemeral: true });
    }
});

client.on('messageCreate', async (message) => {
    if (message.content.toLowerCase() === 'menu') {
        if (message.author.id === client.user.id) return;
        message.delete();

        const buttons = Object.keys(COMMANDS).map(customId =>
            new MessageButton()
                .setCustomId(customId)
                .setLabel(`Question ${customId}`)
                .setStyle('PRIMARY')
        );

        const rows = [];
        while (buttons.length) {
            rows.push(new MessageActionRow().addComponents(buttons.splice(0, 3)));
        }

        const embed = new MessageEmbed()
            .setTitle('Guard - Auto Support.')
            .setThumbnail('https://cdn.discordapp.com/avatars/1080039548651839578/2dfc4f9333eb445a900f8848e8090f2f.webp?size=4096')
            .setDescription(`**Sélectionnez votre question dans le menu ci-dessous**.\n\n${Object.keys(COMMANDS).map((cmd, index) => `${index + 1}️⃣ ・${COMMANDS[cmd].question}`).join('\n')}`)
            .setColor('#2F3136');

        await message.channel.send({ embeds: [embed], components: rows });
    }
});

client.login('token');