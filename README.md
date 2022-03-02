![logo](https://cdn.discordapp.com/attachments/715246735244394576/921390736392470538/Better_Than_Us.jpg)

# 🤖 ArissaBot

## Élements requis

1. Discord Bot Token **[Guide](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)**
2. YouTube Data API v3 Key **[Guide](https://developers.google.com/youtube/v3/getting-started)**  
2.1 **(Optional)** Soundcloud Client ID **[Guide](https://github.com/zackradisic/node-soundcloud-downloader#client-id)**
3. Node.js v14.0.0

## 🚀 Installation

```sh
Download or clone repo
Open in cmd
npm install
Run .bat or .sh file
```

## ⚙️ Configuration

Copiez ou renommez `config.json.example` en `config.json` et remplissez les valeurs :

⚠️ **Note: Ne jamais commit ou partager publiquement votre token ou vos clés API** ⚠️

```json
{
  "TOKEN": "VOTRE_BOT_TOKEN",
  "YOUTUBE_API_KEY": "YouTube_Data_API_v3_google_cloud",
  "SOUNDCLOUD_CLIENT_ID": "",
  "MAX_PLAYLIST_SIZE": 10,
  "PREFIX": "&",
  "STAY_TIME": 30,
  "DEFAULT_VOLUME": 50,
  "greeting": {
    "channel": "CHANNEL_DE_BIENVENUE"
  },
  "reactionRole": {
    "ID_MESSAGE_DU_REGLEMENT": {
      "emojis": [
        {
          "name": "✅",
          "roles": "ID_DU_ROLE_À_ATTRIBUER"
        }
      ]
    }
  }
}
```

## 📝 Fonctionnalités

> Note: Le préfixe par défaut est '&'

* 🎶 Lire de la musique à partir de YouTube via l'url
* 🔎 Lire de la musique à partir de YouTube via une requête de recherche
* 🎶 Lire de la musique à partir de Soundcloud via l'url
* 🔎 Rechercher et sélectionner la musique à jouer
* 📃 Lire des playlists youtube via l'url
* 🔎 Lire des playlists youtube via une requête de recherche
* 📢 Envoyer des messages de bienvenue
* 👉 Attribué des rôles avec les réactions
* 📞 Créer des salons vocaux privés pour les utilisateurs

## 👨‍💻  Commandes

* Now Playing (&np)
* Queue system (&queue, &q)
* Loop & Repeat (&loop)
* Shuffle (&shuffle)
* Volume control (&volume, &v)
* Lyrics (&lyrics, &ly)
* Pause (&pause)
* Resume (&resume, &r)
* Skip (&skip, &s)
* Skip to song # in queue (&skipto, &st)
* Move a song in the queue (&move, &mv)
* Remove song # from queue (&remove, &rm)
* Play an mp3 clip (&clip song.mp3) (put the file in sounds folder)
* List all clips (&clips)
* Show ping to Discord API (&ping)
* Show bot uptime (&uptime)
* Toggle pruning of bot messages (&pruning)
* Help (&help, &h)
* Command Handler from [discordjs.guide](https://discordjs.guide/)
* Media Controls via Reactions