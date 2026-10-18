/* Konten bisa diedit sesuai nama, foto, dan pesan yang ingin kamu kenang.
   Simpan foto di folder assets/ lalu sesuaikan nilai src di bawah.
   Autoplay audio dicoba otomatis, tetapi browser HP mungkin meminta interaksi pertama. */
const CONFIG = {
    pageTitle: "Our Last Memories",
    crushName: "Ryy",
    senderName: "Dari Aku",
    typingSpeed: 30,
    ui: { dear: "For", back: "Back" },
    theme: {},
    effects: { floaters: true },
    music: { src: "song.mp3", enabled: true },
    opening: {
        badge: "surat dari tepian waktu",
        headline: "Ada yg masih tersimpan",
        subhead: "di antara ombak yang pulang dan senja yang perlahan hilang.",
        message: "Tentang kenangan yang tak benar-benar pergi, meski kita sudah lama tak kembali.",
        signature: "dibaca perlahan, seperti mendengar laut",
        button: "Open The Memories"
    },
    letter: {
        title: "Untuk kenangan yang pernah ada",
        message: "Kadang aku merindukan hal-hal sederhana yang dulu terasa biasa saja. Percakapan kecil, tawa yang datang tanpa alasan, dan waktu yang seolah berjalan lebih lambat saat kita bersama.\n\nSekarang semuanya hanya tinggal ingatan. Seperti jejak kaki di pasir, ombak datang dan menghapusnya, tetapi bukan berarti jejak itu tak pernah ada.\n\nAku tidak menulis ini untuk memintamu kembali. Aku hanya ingin memberi tempat bagi kenangan itu, agar ia bisa tinggal dengan tenang, seperti laut yang menyimpan banyak cerita di dasarnya.",
        button: "Lihat yang tersisa"
    },
    little: {
        title: "Hal kecil yang masih kuingat",
        items: [
            { icon: "🌊", title: "Suara", text: "Ada suara yang tak lagi terdengar, tetapi masih bisa kuingat saat malam terlalu sunyi." },
            { icon: "🌫️", title: "Jarak", text: "Waktu membuat kita jauh, tanpa benar-benar menjelaskan bagaimana caranya." },
            { icon: "🕯️", title: "Sisa cahaya", text: "Beberapa kenangan redup, namun tak sepenuhnya padam." }
        ],
        button: "See The Memories"
    },
    memories: {
        title: "Four Pict Of Us",
        photos: [
            { src: "ssml.jpg", caption: "Disaat kita bermain bersama" },
            { src: "sscall.jpg", caption: "Tawamu pada saat itu" },
            { src: "her.jpg", caption: "Namaku yg kamu simpan didalam baju" },
            { src: "us2.jpg", caption: "Our First Date" }
        ],
        paragraphs: [
            "Ada masa ketika kita tidak sadar sedang menciptakan kenangan. Kita hanya menjalani hari, tertawa untuk hal-hal kecil, dan mengira esok akan selalu memberi kesempatan yang sama.",
            "Kini, saat mengingatnya kembali, semuanya terasa seperti memandang laut dari kejauhan. Indah, sedikit menyakitkan, dan tak mungkin kugenggam lagi.",
            "Empat foto ini bukan cara untuk menahan masa lalu. Ini hanya ruang kecil untuk berterima kasih pada waktu yang pernah mempertemukan kita."
        ],
        button: "Ada satu lagi"
    },
    soloMemory: {
        title: "Satu foto, banyak yang kurindukan",
        photo: { src: "us.jpg", caption: "Satu kenangan yang tak ingin kubenci" },
        paragraphs: [
            "Dari semua hal yang berlalu, kadang satu gambar saja cukup untuk membawa kita kembali ke waktu yang jauh. Bukan karena kita ingin tinggal di sana selamanya, melainkan karena pernah ada bagian hidup yang terasa begitu berarti.",
            "Seperti laut yang menyimpan suara ombak bahkan setelah pantainya sepi, aku menyimpan kenangan ini tanpa harus mengubah apa pun yang telah terjadi.",
            "Semoga suatu hari nanti, saat foto ini kulihat lagi, yang tersisa bukan hanya rasa kehilangan, tetapi juga rasa syukur karena pernah memiliki momen seindah itu."
        ],
        button: "Lanjutkan"
    },
    why: {
        title: "Yang ingin kusimpan",
        items: [
            { title: "Rasa terima kasih", text: "Untuk waktu yang pernah kita bagi, meski akhirnya tidak berjalan selamanya." },
            { title: "Keberanian melepas", text: "Tidak semua yang berharga harus tetap menjadi milik kita." },
            { title: "Ruang untuk rindu", text: "Rindu boleh datang, tanpa harus menjadi alasan untuk kembali." },
            { title: "Damai dengan waktu", text: "Biarlah masa lalu menjadi bagian cerita, bukan tempat untuk terus menetap." }
        ],
        button: "Baca pesan terakhir"
    },
    final: {
        badge: "sebelum halaman ini ditutup",
        headline: "Semoga laut menjaga cerita kita",
        paragraphs: [
            "Mungkin kita tak akan kembali menjadi seperti dulu. Dan mungkin memang tidak semua cerita diciptakan untuk memiliki akhir yang sama seperti awalnya.",
            "Jika suatu hari angin laut membawa ingatan tentang kita, semoga aku bisa tersenyum kecil. Karena meski semuanya telah lama berlalu, pernah ada waktu ketika kenangan itu membuat hidup terasa lebih hangat.",
            "Terima kasih telah menjadi bagian dari cerita yang akan selalu kuingat. Aku akan membiarkan ombak membawa sisanya, perlahan, tanpa membenci apa pun.", 
            "Maaf,aku tidak bermaksud mengganggu mu lagi, aku janji ini adalah pesan terakhir yangg aku kirimkan padamu, biarlah rasa ini terus ada sampai batas waktu yang tidak akan ada batasnya",
            "Rasanya seperti halaman terakhir dari buku yang sangat kusayangi, kuletakkan perlahan, bukan karena tak ingin membacanya lagi, tapi karena tau tak akan ada kisah yg mampu menyamai perasaan ini, maafkan segala salah yg pernah kubuat selama ini, maafkan semua kecewa yg aku berikan padamu, beribu maaf mungkin tak cukup untuk memaafkan orang sepertiku, namun, aku harap dengan web yang aku buat sendiri ini, kamu bisa membuka pintu maaf untukku, jika ombak terlalu keras padamu,menepilah,aku akan selalu menjadi pulau terdekat diantara lautan yang kamu sebrangi. "
        ],
        from: "kenangan yang kusimpan baik-baik,",
        button: "Baca dari awal"
    }
};
