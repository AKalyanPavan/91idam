import Header from '@/components/header.js'
import Footer from '@/components/footer.js'
import Fold1 from './fold1.js'

export default function UserProfile() {
	return(
		<>
			<Header />
			<div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
				<Fold1 />
			</div>
			<Footer />
		</>
	)
}