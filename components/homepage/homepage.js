import Header from '@/components/header.js'
import Fold1 from './fold1.js'
import Fold2 from './fold2.js'
import Fold3 from './fold3.js'
import Fold4 from './fold4.js'
import Fold5 from './fold5.js'
import Fold6 from './fold6.js'
import Footer from '@/components/footer.js'

export default function Homepage() {
	return(
		<>
			<Header />
			<Fold1 />
			<Fold2 />
			<div className="relative">
				<div className="absolute h-[500px] w-full bg-[#B59327]">
				</div>
				<Fold3 />
			</div>
			<Fold4 />
			<Fold5 />
			<Fold6 />
			<Footer />
		</>
	)
}