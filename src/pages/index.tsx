import type { NextPage } from 'next'
import { PantryInput } from '../components/pantry-input'
import { PantryInputMenu } from '../components/pantry-input-menu'

const Home: NextPage = () => {
    return (
        <div className="grid gap-4 grid-cols-4 p-2">
            <div className="col-start-2 col-end-4 relative">
                <PantryInput />
                <PantryInputMenu />
            </div>
        </div>
    )
}

export default Home
