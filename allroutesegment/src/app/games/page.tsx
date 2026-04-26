import Link from 'next/link'
import { games } from '@/app/data/games'

const GamePage = () => {
  return (
    <div className="bg-white min-h-screen p-8">
        <h1 className="text-3xl font-bold text-center mb-8">Explore Games</h1>
        <div>
            {games.map((game)=>(
                <Link key={game.id}
                href={`/games/${game.category}/${game.slug}`}>
                    <div>
                        <h2>{game.title}</h2>
                        <p>{game.description}</p>
                    </div>
                </Link>
            ))}
        </div>
    </div>
  )
}

export default GamePage