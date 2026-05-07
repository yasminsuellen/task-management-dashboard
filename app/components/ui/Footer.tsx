export default function Footer() {
    return (
        <footer className="w-full bg-blue-600 shadow-sm z-50">
            <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-center">
                <p className="text-sm text-center text-blue-999">
                    © Website by{" "}
                    <a
                        href="https://wa.me/5521975874672"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold hover:opacity-80 transition-opacity duration-200"
                    >
                        Yasmin Suellen
                    </a>
                    {" · "}Software Developer
                    {" · "}Brazil Remote |{" "}
                    <a
                        href="https://wa.me/5521975874672"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white font-bold hover:opacity-80 transition-opacity duration-200"
                    >
                        Let's build something?
                    </a>
                </p>
            </div>
        </footer>
    )
}
