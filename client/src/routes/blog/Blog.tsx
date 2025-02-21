import CallToAction from "../../components/CallToAction"
import Navbar from "../../components/Navbar"
import Footer from "../../components/Footer"

function HeroBlog() {
    return (
        <div className="bg-[url('/blog-letters.png')] h-[300px] flex flex-col items-center">
            <Navbar />
            <h1 className="text-white mt-10 text-3xl p-2 text-center mb-0 md:text-4xl md:font-bold">Insights & Updates</h1>
        </div>
    )
}

function BlogCard(props: {
    imageUrl: string,
    title: string,
    date: string,
    preview: string,
    link: string
}) {
    return (
        <div className="max-w-[400px] bg-[#F3FFFB] shadow-2xl max-md:mx-2">
            <img className="h-[350px] w-[100%]" src={props.imageUrl} alt="Blog Image Preview" />
            <div className="p-8 min-h-[400px] flex flex-col justify-between">
                <h2 className="text-2xl">{props.title}</h2>
                <span className="font-bold">{props.date}</span>
                <p className="text-[#535353]">{props.preview}..<a href={props.link}>[...]</a></p>
                <a href={props.link}>Read More »</a>
            </div>
        </div>
    )
}

function BlogList() {
    return (
        <div className="flex max-md:flex-col min-md:px-6 justify-around items-center max-md:gap-10 bg-white py-10">
            <BlogCard imageUrl="/flower-box.png" title="Mastering the First Impression" date="January 28, 2025" preview="In the fast-paced worlds of business and technology, first impressions are everything. Whether you're pitching a new product, meeting a potential client, or launching a groundbreaking app, the ability to make a strong and lasting impression can make the difference between success and missed opportunities. Here's how to master the art of the first impression in the business and tech landscapes" link="/blog/mastering-the-first-impression" />
            <BlogCard imageUrl="/google-search.png" title="The Art of Drawing Readers In" date="February 02, 2025" preview="In today's information-saturated world, capturing and maintaining the attention of your audience has become both an art and a science. Whether you're writing a blog post, developing a product page, or creating a pitch deck, the ability to draw readers in is critical to success in the business and tech landscapes. Here's how to master the art of engaging your audience from the first word" link="/blog/the-art-of-drawing-readers-in" />
            <BlogCard imageUrl="/teal-bg.png" title="Crafting Captivating Headlines" date="February 19, 2025" preview="In the fast-paced world of business and technology, where new developments surface daily, capturing attention has never been more critical. Amid the constant stream of content, a powerful headline can be the difference between a click and oblivion. For entrepreneurs, marketers, and tech leaders, crafting captivating headlines is an essential skill to command attention, drive engagement, and convey value." link="/blog/crafting-captivating-headlines" />
        </div>
    )
}

export default function Blog() {
    return (
        <>
            <HeroBlog />
            <BlogList />
            <CallToAction />
            <Footer />
        </>
    )
}