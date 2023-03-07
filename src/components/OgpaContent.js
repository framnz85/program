import React from 'react';
import { RightCircleOutlined } from '@ant-design/icons';
import { isMobile } from 'react-device-detect';

import MentoringGroup from "../images/mentoringgroup.png";
import SampleDelivery from "../images/sampledelivery.png";
import NimfaManiscan from "../images/nimfamaniscan.png";
import McjhimBumacod from "../images/mcjhimbumacod.png";
import GregSinugbojan from "../images/gregsinugbojan.png";
import KleinDelosSantos from "../images/kleindelossantos.png";
import BuyingCustomer from "../images/buyingcustomer.png";
import Order18000 from "../images/order18000.png";
import Order28000 from "../images/order28000.png";
import OgpaWorkshop from "../images/ogpaworkshop.png";
import MoneyBackGuarantee from "../images/moneybackguarantee.png";
import ActoionTakerGuarantee from "../images/actoiontakerguarantee.png";

import NickTrinidad from "../images/nicktrinidad.png";
import ArmanViacrucis from "../images/armanviacrucis.png";
import RosalindaRayo from "../images/rosalindarayo.png";
import JunneferGabinete from "../images/junnefergabinete.png";
import SalvacionCaranay from "../images/salvacioncaranay.png";
import ValiantDominic  from "../images/valiantdominic.png";
import BernaCordero from "../images/bernacordero.png";
import MaryGracePasco from "../images/marygracepasco.png";
import MaritesGuzman from "../images/maritesguzman.png";

const OgpaContent = ({
    handleButtonClick,
    amount,
    spotTaken,
    spotLeft,
    showInitButton,
    schedules
}) => {

    const schedContainer = {
        width: isMobile ? "100%" : 250,
        fontSize: 16,
        border: "1px solid #4682B4",
        marginLeft: 3,
        marginBottom: 3
    }

    const schedHeading = {
        backgroundColor: "#4682B4",
        color: "#fff",
        padding: "5px 10px",
        textAlign: "center"
    }

    const schedBody = { padding: 10 }
    
    const testimony = {
        display: isMobile ? "block" : "flex",
    }
    
    const testImage = {
        paddingRight: isMobile ? "0px" : "20px",
        paddingBottom: isMobile ? "10px": "0px",
    }

    const bonusDiv = {
        display: "flex",
        width: isMobile ? "100%" : "70%",
        justifyContent: "space-between"
    }

    const formatDate = (dateToFormat, withYear = false) => {
        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        const date = new Date(dateToFormat);
        const year = date.getFullYear();
        let month = monthNames[date.getMonth()];
        let day = date.getDate();

        if (withYear) {
            return month + ' ' + day + ', ' + year;
        } else {
            return month + ' ' + day;
        }
    }

    return (
        <div style={{marginTop: 20, fontSize: isMobile ? 16 : 20}}>            
            <div align="center">
                <span style={{ color: "#F00", fontSize: isMobile ? 20 : 32 }}>"Give Me <b>2 Hour a Day for 10 Straight Calendar Days</b> To Teach You How To Completely Build A Successful Online Grocery Business And <span style={{ color: "blue" }}><b>Another 75 Days</b> To Help You Build A Physical Grocery Business</span> And <span style={{ textDecoration: "underline" }}>Make A Lot Of Money</span>"</span>
                <br /><br />

                <span style={{color:"#009A57", ontSize:"22px", fontStyle:"italic", fontSize: isMobile ? 18 : 24}}>Then I'll Give You An <span style={{textDecoration:"underline"}}>eCommerce Website</span> That <b>Has Its Own Domain Name</b> And A <b>Mobile App</b> Wherein <b>I And My Staff Will Be The One Who Will Do The Uploading Of Grocery Items Into It</b> So You Can Start The Business Right Away!</span>
                <br /><br />
            </div>

            Gusto mo bang magsimula ng isang <u>Grocery Business</u> pero di mo alam kung papaano?, Or, isa ka bang meron ng <u>sari-sari store or small grocery store</u> pero <b>gustong mag scale-up para <u style={{color: "#880808"}}>maparami pa ang customers at sales sa business mo</u>?</b>
            <br /><br />

            Isa ka bang empleyado or work from home individual  na <u>gustong magkaroon ng side hustle business</u> dahil di mo na feel ang security diyan work mo lalong-lalo na ngayong maraming uncertainties at maraming companies ang nagli-layoff ng mga empleyado dahil may naka-ambang na recession. <b>At natatakot kang ikaw na ang susunod?</b>
            <br /><br />

            Or, isa ka bang OFW na <b><u>gustong-gusto ng makauwi ng Pilipinas</u></b> pero hindi alam kung anong klaseng negosyo ang papasukan para may hanap-buhay <b>sakaling mag-”for good” na dito</b>?
            <br /><br />

            Then… Give me Two(2) Hour a Day for 10 (Ten) Straight Calendar Days to Teach You how to <u>Completely Build</u> a
            <br /><br />

            <center><h2 style={{color: "green"}}>Successful Hybrid Online Grocery Business</h2></center>
            <br />

            And <u style={{color:"red", fontWeight: "bold"}}>Make a Lot of Money</u> with it!!!
            <br /><br />

            Within 10 days, I'll give you an <span style={{color: "green", fontWeight: "bold" }}>eCommerce Website</span> that has its <b style={{color: "violet"}}>Own Domain Name</b> and has a <b style={{color: "red"}}>Mobile Application</b> wherein me and my staff will be the one who will do the <u>Uploading Of Grocery Items</u> into it
            <br /><br />

            So that you can <u>have a website</u> that has <b style={{color: "blue"}}>already grocery items</b>. This way… You can start your Online Grocery Business right away!
            <br /><br />

            Hi, ako nga pala si Francis Clavano and I am a full-time online entrepreneur. I am also an online coach for more than <u>6 years teaching and mentoring thousands of people</u> all over the Philippines on how to <b>CREATE and BUILD a Successful Online Grocery Businesses</b>.
            <br /><br />

            <center><img src={MentoringGroup} alt="Mentoring Group" style={{width: "100%"}} /></center>
            <br />

            The picture above are the people in my mentoring and coaching team. Over the years of doing my online grocery business I already earned a gross income of <span style={{color: "green", fontWeight: "bold"}}>more than 10 Million pesos</span>.
            <br /><br />

            But let me take you first back to the time when I don't have this business yet. The time when I was still struggling how to make money online. Like you I was also dreaming of <span style={{color: "#0096FF"}}>having a profitable business</span>.
            <br /><br />

            Before I quitted my job, I have ventured into a lot of businesses. I have 2 internet cafe, some fruit businesses, and I also ventured in lending business.
            <br /><br />

            <i>"Pero sadly lahat <b>nalugi</b>!"</i>
            <br /><br />

            <h4>They don't succeed because…</h4>
            <ul style={{listStyleType: "circle"}}>
                <li>
                    I only have limited customers -- The only people I can turn as my customers are those who are living in the surrounding area of my business location.
                </li>
                <li>
                    I have a lot of competitors.
                </li>
                <li>
                    I don't know how to market my business.
                </li>
                <li>
                    I don't have any connections to any influential people to help me with my marketing.
                </li>
            </ul>

            One time when I was reading my Facebook timeline, I read a statement from the richest guy on Earth (Bill Gates), he says…
            <br /><br />
            
            
            <b><i>"If your business is not on the internet then your business will be out of business"</i></b>.
            <br /><br />

            At that moment I quietly tell myself... <i>AHA! Kaya pala hindi nagsa-succeed ang mga businesses ko dahil hindi ko ginagamit ang internet sa pagbebenta ng mga products and services ko.</i> That statement of Bill Gates is not just prophetic but it is really happening now!!!
            <br /><br />

            With the internet pala you can reach as many customers as you can. Mas madali rin ang pagmamarket dito at hindi ka affected kahit marami kang kakompetensya. With social media, hindi mo rin kailangan maki-connect sa mga influential people. <b style={{color: "darkred"}}>You can be an influential on your own!</b>
            <br /><br />

            That statement of Bill Gates is not just prophetic but it is really happening now!!! <span style={{color: "#0096FF"}}>In fact, pinabilis pa nga ito nung nagka pandemya!!!</span> That’s why at that moment I immediately started to think what other types of business will I get into where that <b style={{color: "red"}}>business can be made online, sustainable, and long-term</b>.
            <br /><br />

            At first, I was planning to copy the concept of Lazada and Amazon business selling non-consumable stuff online like jewelry, shoes, and mobile phones.
            <br /><br />

            But it doesn't work for me as I don't have a big capital because I need to put up an initial stocks for the items and I also need enormous amount of money to pay rentals for a commercial space and stockroom. Which I could not afford to as I just recently lost a lot of money from my previous businesses.
            <br /><br />

            Then I consider other businesses which I can sell consumable goods such as <u>fruits, vegetables, diapers, and rice</u>.
            <br /><br />

            To the point, I finally get into...
            <br /><br />

            <center><h2 style={{color: "green"}}>Selling Grocery Items Online</h2></center>
            <br />

            Last June 2015, I started my Online Grocery Business here in Davao City. I arrived <b>selling grocery products</b> online because of these very <b style={{color: "#0096FF"}}>Practical Reasons</b>
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Grocery items are being bought only after a customer pays his order which means <b style={{ color: "green" }}>you don't need to have the capital for initial stocks</b>.
            <br /><br />
            
            <span style={{ color: "red" }}>&#10004;</span> You don't need a big room or warehouse to store grocery products so <b style={{ color: "#0096FF" }}>you don't need to invest a very large amount of money for estate cost</b>.
            <br /><br />
            
            <span style={{ color: "red" }}>&#10004;</span> You don't need to rent a space as you <b style={{ color: "green" }}>don't need to display your grocery items</b>. <i>(Wala ka ring monthly operational expenses gaya ng tubig, kuryente, security, and employees)</i>
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> It is <u>consumed in a routinely way</u> so your <span style={{ color: "#0096FF" }}>customers will order it in a regular basis</span>. (Once mo lang sila iimbetahin at paulit-ulit na silang bibili)
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Grocery items are basically food so it is forever be needed by people that's why once you establish it, <b style={{ color: "green" }}>you have a business that runs for a longer period of time</b> (Your business stops only when people stop consuming groceries - which is currently impossible!).
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> <span style={{ color: "#0096FF" }}>You can do it yourself</span> so you may never hire an employee. You may hire a driver or a kargador but it is only optional. (You can even tap courier services gaya ng Transportify, Mobee, etc. for the delivery)
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> <b>YOU’LL LEARN TO LOVE COMPETITION</b> through the business. Online grocery business is now gaining popularity to a lot of people specially during the pandemic. The more people doing the same business is already a sign na ang business nato ay Patok at siguradong kikita ka!
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Because it's online, <b style={{ color: "#0096FF" }}>you can sell it anywhere you want</b>. You can sell it to other cities, to other provinces, to the whole country or even to the whole world as long as you have a courier service that can deliver on that particular location.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> You can also <b style={{ color: "green" }}>sell it online at a little higher price</b>. This is because you are giving service to people by providing them convenience. Instead na sila pa yung bibili sa supermarket, ngayon hindi na! Idedeliver pa ito mismo sa bahay nila.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Grocery Store or Supermarket are visible everywhere that's why <b style={{textDecoration: "underline"}}>supply for your grocery items is abundant</b>.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Plus <span style={{ color: "#0096FF" }}>Manufacturers and Distributors of grocery products are now eager to adopt an e-commerce concept of selling</span> so they are finding online store business owners who do online grocery.
            <br /><br />

            <i style={{color: "#EE4B2B"}}>Once you get supply directly from distributors or manufacturers, you can earn more than twice the profit while the prices of your items is the same as that of the supermarket or even lower</i>
            <br /><br />

            <span style={{ color: "red" }}>When these things happens, you will now have an option to add an additional Physical Grocery Store on top of your existing Online Grocery.</span> And that’s what I am going to teach you for the next 10 Days…
            <br /><br />
            
            <span style={{ color: "#85219C" }}>And because of the internet it will not be hard for you to find customer in any business today.</span>
            <br /><br />

            There is actually an emerging <b style={{color: "red"}}>Marketing Strategy</b> that only few people knew about and it is the strategy that big businesses like <b>SM, Ayala, Puregold and Gaisano</b> are using to start selling their grocery products online.
            <br /><br />

            The good news is that this strategy can also be applied to your online grocery business. 
            <br /><br />

            <center><h2 style={{color: "red"}}>How?</h2></center>
            <br />
            
            You only need to learn it. I myself is already applying it to my own online grocery and it provides me a lot of sales! <b style={{ color: "green" }}>Let me show you one of my actual profit when I use this strategy.</b>
            <br /><br />

            Last time, I delivered 4 orders to my customers.
            <br /><br />

            <center><img src={SampleDelivery} alt="Sample Delivery" style={{width: "100%"}} /></center>
            <br /><br />

            I earned a net profit of P 1,641.14 (10% of the sale + delivery fees) and it only took me 2 hours to deliver these orders to my customers.
            <br /><br />

            <i>"This is a proof that it is really possible to have a business that <b style={{ color: "green" }}>you only need to spend 2 hours a day to earn a net income of 1,600 pesos</b>"</i> ... It's already an income of a junior manager in a company working 8 hours within the same day!
            <br /><br />

            One of the best thing about online grocery business is that <u>it doesn't require so much of your time</u> so if you have a day job or you are busy with another business, you can do it right after your work. Now if it provides big income for only 4 orders, <b style={{ color: "red" }}>imagine how much revenue it can give you if you have 8, 10, 20, or more orders a day</b>.
            <br /><br />

            That would be a lot of money, right?
            <br /><br />

             And don't worry because you can <span style={{ color: "red" }}>Easily learn the Marketing Strategy</span> used by successful entrepreneurs I mentioned a while ago and I can help you with regards to that!
            <br /><br />

            Just continue watching...
            <br /><br />

            <center><h2 style={{color: "green"}}>So… How To Earn 100k Pesos Or More A Month?</h2></center>
            <br />

            Last January 2016, right after I quitted my job, I decided to teach people how to <u style={{ color: "green" }}>Create and Establish their OWN online grocery business</u>, the exact online grocery business I have.
            <br /><br />

            I teach them how I do it and <u>how they too can do this kind of business</u> and <span style={{ color: "red" }}>make a lot of money</span> whether they are a professional, employed, OFW or even someone who wanted <u>to have a sustainable and long-term income</u>.
            <br /><br />

            When I started my online grocery business it took me almost a year to build it because I need to <u>learn all the necessary knowledge and skills</u> in establishing this kind of business.
            <br /><br />

            During those times there are a lot of painful mistakes I experienced. <i style={{ color: "#0096FF" }}>“I wish I could have someone who would guide me so I can build it easier, faster with fewer or almost no mistakes.”</i>
            <br /><br />

            Especially in the <b style={{ color: "red" }}>MARKETING</b> - <b>(You need to learn a lot on this!)...</b> But sadly there is none.
            <br /><br />

            Now, since I have gone thru all those mistakes and I don't want you to experience it as well, I decided to <u style={{ color: "green" }}>teach people how to do the right steps</u> in establishing an online grocery business. Right now, because of what I taught them, <u style={{ color: "red" }}>more and more people are earning huge profit</u> from their online grocery business.
            <br /><br />

            In fact some of them go beyond the scope and established a <b>Mini Grocery Store</b> together with their online grocery wherein the products that was ordered by customers on their website are being purchased directly from their store.
            <br /><br />

            Here are some of them and their corresponding sales…
            <br /><br />

            <center><img src={NimfaManiscan} alt="Nimfa Maniscan" width={ isMobile ? "100%" : ""} /></center>
            <br /><br />

            This is from Nimfa Maniscan, sabi niya… “Hi all, share ko lang… I have a successful delivery kahapon, 2nd order sa online grocery ko.”
            <br /><br />

            <center><img src={McjhimBumacod} alt="Mcjhim Bumacod" width={ isMobile ? "100%" : ""} /></center>
            <br /><br />

            Ito naman kay Mcjhim Bumacod… “First order is worth Php 5k at yung second order ay worth Php 5.6k naman.”
            <br /><br />

            <center><img src={GregSinugbojan} alt="Greg Sinugbojan" width={ isMobile ? "100%" : ""} /></center>
            <br /><br />

            “Hi Sir Francis. Sorry disturb ako excited lang kasi. At last the wall of ice in my website has been broken. I got my first real ice breaker sale today. Nawala antok ko pag open ko ce mayron e-store email. Thank you very much sir.” – Greg Sinugbojan
            <br /><br />

            <center><img src={KleinDelosSantos} alt="Klein Delos Santos" width={ isMobile ? "100%" : ""} /></center>
            <br /><br />

            At itong kay Klein Delos Santos, sabi nya… “Iba talaga coach… Kahit maliliit basta palagi. Naka 8 customers ako ngayong araw na to. P26k in total sales.”
            <br /><br />

            These are some of the few thousand people who is now <b style={{textDecoration: "underline"}}>starting to earn</b> both from their online grocery business and physical grocery store.
            <br /><br />

            Now, aside from learning the knowledge, skills, and marketing, one of the major thing <u>you need to prepare</u> in this business is an <b style={{ color: "red" }}>Ecommerce Website</b>. I found out that hiring a web programmer would cost you around <i style={{fontWeight: "bold"}}>50,000 pesos to 100,000 pesos</i> to do an e-commerce website.
            <br /><br />

            Depende na rin sa looks at functionality na gusto mong meron nito at <u>hindi pa kasali dyan ang maintenance and hosting cost</u>. At kung may ipapa-modify ka pa or kung gusto mo pang mag-additional ng Mobile Apps, you will need to pay the additional hours needed to perform that specific website development task.
            <br /><br />

            Aside from the creation of your e-commerce website you need also to <u>upload the details of all the grocery items</u> into it. Hindi yan ganun kadali! You need to take a lot of time to do it.
            <br /><br />

            Imagine that there are over 45,000 grocery items that you need to upload. <b><i>How can you do that when you are employed or have limited time?</i></b>
            <br /><br />

            It's almost impossible!
            <br /><br />

            At ito pa! Upon operating your online grocery business, you need to constantly monitor and update grocery prices as it is changing so fast. Because if not…  <span style={{ color: "#D2042D" }}>You may loose money!</span>
            <br /><br />

            But not for you this time because I have developed an <b style={{ color: "green" }}>Online To Mini Grocery Program</b>
            <br /><br />

            Wherein during the program I will going to give you <u><b>Grocery eCommerce Website that has a <span style={{ color: "darkred" }}>Domain Name and a Mobile App</span></b> and we will be the one who will do the uploading and monitoring of grocery items into your website</u>.
            <br /><br />

            Not only that, I will also going to <u>teach you the needed knowledge and skills</u> how to <b style={{ color: "green" }}>bring more customers and sales</b> into your business. Let me talk more about that later…
            <br /><br />

            For now, I would like to show you <b style={{ color: "#8B0000" }}>how I generated more than 100,000 pesos income a month</b> on my online grocery business <u>using the eCommerce Website</u> I'll be including in the training! That you could also do or <b>pwedeng mahigitan</b> pa if you run this kind of business.
            <br /><br />

            <center><img src={BuyingCustomer} alt="Buying Customer" width="70%" /></center>
            <br />

            Right now I already have 420 customers buying regularly in my online grocery business.
            <br /><br />

            Each of them is buying an <span style={{ color: "blue" }}>average amount of Php 3,000 worth of grocery items</span> per month, my percentage earnings for this is 10% so computing it will give...
            <br /><br />

            <b>Php 3,000 x 420 x 10% = Php 126,000/mo</b>
            <br /><br />

            <center><img src={Order18000} alt="18000 order" width="70%" /></center>
            <br />

            Well, that's a rough estimate. Minsan pa nga umaabot ng 18,000 pesos yung order ng isa kong customer.
            <br /><br />

            <center><img src={Order28000} alt="28000 order" width="70%" /></center>
            <br />

            At yung mga students ko na gumagawa na rin ng online grocery ay umaabot naman ng 28k ang isang order.
            <br /><br />

            <b>Php 28,000 x 420 x 10% = Php 1,176,000/mo</b>
            <br /><br />

            At yung iba <u style={{ color: "#0096FF" }}>hindi naman once a month lang bumibili</u>, merong din iba once a week. Meron ngang iba once every other day eh gaya ng mga merong restaurant or karenderya. Halos araw-araw pa yan bumubili.
            <br /><br />

            And what makes it more profitable is that you can get more than 420 customers because of the <span style={{ color: "red" }}>emerging Marketing Strategy</span> I am going to show to you on the training.
            <br /><br />

            <center><h2 style={{color: "green"}}>Here's A Golden Opportunity For You</h2></center>
            <br />

            You can now start an online grocery business in just a few days! Create an Online Grocery Business first so you don’t need a large capital then later a Physical Grocery so there will be continuous supply of products and an assurance that what you sell online is 100% available.
            <br /><br />
            
            Just allow me to <b><u>teach you for 10 straight calendar days</u></b> all the knowledge, skills, and marketing... Then <span style={{ color: "red" }}>you can have an online grocery business ready for operation</span>.
            <br /><br />

            <b style={{ color: "#0096FF" }}>Why am I 100% sure about that?</b>
            <br /><br />

            This is because I will going to <u style={{color: "#D2042D"}}>Teach You</u>  how to do it in a <b style={{color: "#D2042D"}}>Workshop Format</b>.  <b>What do I mean with that?</b> <b>Workshop</b> is a different type of training wherein you will engage in an <span style={{color: "#D2042D"}}>intensive discussion</span> and must follow all the activity I'll be giving you on this program.
            <br /><br />

            In short, hindi ka pwedeng magtapos sa workshop kung wala kang <span style={{color: "red"}}>successful and fully operational</span> na <u>Online Grocery Business</u>. <b style={{color: "red"}}>Not only that, I will also help you build your first 420 buying customers and make 100,000 pesos sales per month or more!</b>
            <br /><br />

            <div style={{border: "1px solid red", padding: 10}}><i>But note that this is not a get rich quick scheme type of business and I only worked with serious people who are looking for a legitimate way to establish business online by selling grocery products. If you are willing to take the action needed to establish this business then this is right for you.</i></div>
            <br />

            The great news now is that instead of preparing it in 1 year or more like what I did, <b style={{color: "green"}}>you can begin your online grocery in just a few days</b> <i>(it depends on how fast you learn and act)</i> without the painful mistakes just like what I've encountered.
            <br /><br />

            And instead of canvassing the cheapest website creator, not anymore for you now because <b style={{color: "green"}}>I'll be giving you an <span style={{color: "red"}}>Ecommerce Website</span> and a <u>free labor in uploading grocery items into it</u></b>.
            <br /><br />

            This e-commerce website is the <b><u style={{color: "red"}}>fully upgraded version with a Domain Name and Mobile App</u></b>, it cost around 48,000 pesos if you purchase it separately or more if you hire someone make it but not this time because <u style={{color: "green"}}>I'll be giving you that absolutely free</u>.
            <br /><br />

            All you need to do is to pay its monthly hosting fee after 1 year!
            <br /><br />

            Aside from the ecommerce website, you also don't need to go to a supermarket to collect all the data of the grocery items, automatically the e-commerce website and mobile app you'll be getting <b style={{ color: "#0096FF" }}>will contain all the fast moving grocery products in the Philippines</b>.
            <br /><br />

            So <u>it doesn't matter if you're good in computer or not</u>, you can start the business right away!
            <br /><br />

            Allow me to introduce to you to the country's first program on how to build an online grocery business called...
            <br /><br />

            <center><img src={OgpaWorkshop} alt="OGPA Program" width="50%" /></center>
            <br />

            My students usually called it in its abbreviation form, <b style={{color: "green"}}>OGPA</b> Program.
            <br /><br />

            In this program, you will be receiving <u>5 (Five) exclusive lessons</u> that will intensively teach you how to build online grocery business. While on the program, you will be receiving a <u style={{color: "green"}}>Fully Upgraded Grocery Ecommerce Website which has its own Domain Name and Mobile Application</u> and we will be the one who <u style={{color: "#D2042D"}}>will do the uploading of grocery items into it</u>.
            <br /><br />

            <b style={{color: "red"}}>... so you can start the business right away!</b>
            <br /><br />

            <b style={{color: "green"}}>And remember you only need to have at least 420 buying customers to make a lot of sales in this business.</b>
            <br /><br />

            I forgot to tell you that mostly, those <u>who buy in my online grocery business</u> are <b style={{color: "green"}}>OFWs</b>. They are one of those who are highly needing the service of this business. They always wanted to <u>make sure that their family</u> here in the Philippines have <b><u>food to eat</u></b> instead of just sending them money.
            <br /><br />

            When I do my research, I found out that there are over <b><u>2 million OFWs scattered in over 170 countries</u></b> around the world and in order to make a lot of money in this business... <b style={{color: "#0096FF"}}>You need only 420 of them</b>.
            <br /><br />

            And of course <u>OFWs are not the only people</u> you can serve through this business,
            <br /><br />
            
            <span style={{ color: "red" }}>&#10004;</span> We also have those who are <u style={{ color: "red" }}>opulent individual</u> <i>(mayayamang tao)</i> and <b style={{ color: "#0096FF" }}>those who are busy working in BPO or in a hospital</b>.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> We also have home base professionals.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> Mommies who just gave birth to their child who can't go out of their houses to buy groceries.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> People who are afraid to go out of their houses dahil natatakot mahawaan ng covid, monkeypox at iba pang sakit.
            <br /><br />

            <span style={{ color: "red" }}>&#10004;</span> And a whole lot more!
            <br /><br />

            So if you are worried of competition and saying... <i>"Ay marami ng nag-o-online grocery dito sa amin", "Ay nag-o-online grocery na kasi yung mga supermarket dito then"...</i>
            <br /><br />

            <center><h2 style={{color: "red"}}>STOP!</h2></center>
            <br />

            <b style={{color: "green"}}>Remember that sobra sa 100 million ang population natin pero 420 ka tao lang ang kailangan mo</b>.
            <br /><br />

            OFW pa nga lang na 2 million ay napakarami na! Kahit nga <u>isang subdivision or isang condo</u> lang ang customer mo ay kuhang-kuha na ang target income na yun. And be excited because I'm going to teach you in OGPA Program how to find exactly these people.
            <br /><br />

            <center><h2 style={{color: "green"}}>What Can You Get In The OGPA Program?</h2></center>
            <br />

            Ok let me discuss to you the schedule of our Program. There are <b style={{color: "darkred"}}>3 Major Phases</b> that we will be spending in this program.
            <br /><br />

            <h4>1st Phase - Main Phase (2 Weeks, {formatDate(schedules.dateStart1, true)} - {formatDate(schedules.dateEnd1, true)})</h4>
            <br />

            On this period we will be building your grocery website that includes the <u>creation and deployment of it and the uploading of grocery products</u>. By the end of this phase you already have a <b>functional and ready to operate</b> online grocery business.
            <br /><br />

            <h4>2nd Phase - Operation Phase (6 Weeks, {formatDate(schedules.dateStart2, true)} - {formatDate(schedules.dateEnd2, true)})</h4>
            <br />

            After you have done the 1st phase, you are now ready to accept orders. Here in the 2nd Phase, you will now be operating your online grocery business. There will be <b><u>another sets of lessons that will be given to you</u></b> on a weekly basis teaching and instructing you how to get a lot of customers.
            <br /><br />

            <h4>3rd Phase - Ultimate Phase (4 Weeks, {formatDate(schedules.dateStart3, true)} - {formatDate(schedules.dateEnd3, true)})</h4>
            <br />

            This is where we start building your physical grocery store by linking you to the different grocery suppliers. Your business can accept both online and offline orders now. On this phase also, the <b style={{color: "darkred"}}>creation of your Mobile App</b> must have been done and is operational.
            <br /><br />

            <center><h2 style={{color: "green"}}>The Main Phase</h2></center>
            <br />

            The actual schedule of the Main Phase will be on {formatDate(schedules.dateStart1, true)} and ends on {formatDate(schedules.dateEnd1, true)}. On the first weeks (March 6 - 10), we will be building your Online Grocery Website.
            <br /><br />

            <span style={{ color: "red" }}>All you need to do on that week is to send me a request advising me to setup your website and start uploading grocery items into it. This will ensure that even before your first day of program, you have an operational and an active  Online Grocery Ecommerce Website.</span> In fact, once you have the website you can immediately start accepting orders even before the first day of your workshop!
            <br /><br />

            On Monday of the second week ({formatDate(schedules.workshopDate1, true)}), we shall then start the proper intensive training.
            <br /><br />
                        
            Here's the detailed information on what you'll be getting on the program…
            <br /><br />

            <div className={isMobile ? "" : "d-flex justify-content-center"}>
                <div style={{...schedContainer, width: isMobile ? "100%" : "20%"}}>
                    <div style={schedHeading}>
                        Monday 6AM<br/> ({formatDate(schedules.websiteDate1)})
                    </div>
                    <div style={schedBody}>
                        Sign up request form for us to start building your website. 
                    </div>
                </div>
                <div style={{...schedContainer, width: isMobile ? "100%" : "60%"}}>
                    <div style={schedHeading}>
                        Tuesday - Friday<br/> ({formatDate(schedules.websiteDate2)} - {formatDate(schedules.websiteDate5)})
                    </div>
                    <div style={schedBody}>
                        Sit back and relax while you wait for your website to be setup. 
                    </div>
                </div>
                <div style={{...schedContainer, width: isMobile ? "100%" : "20%"}}>
                    <div style={schedHeading}>
                        Saturday or Sunday<br/> ({formatDate(schedules.websiteDate6)} or {formatDate(schedules.websiteDate7)})
                    </div>
                    <div style={schedBody}>
                        You should have a website on these days.
                    </div>
                </div>
            </div>

            <div className={isMobile ? "" : "d-flex justify-content-center"}>
                <div style={schedContainer}>
                    <div style={schedHeading}>
                        SESSION 1 Monday 6AM<br/> ({formatDate(schedules.workshopDate1, true)})
                    </div>
                    <div style={schedBody}>
                        Familiarizing your Website’s User Interface and how you can turn it into a Customer Attraction Focus website so you can have a lot of customers and transforming them from first time buyer into a repetitive buyer.
                    </div>
                </div>
                <div style={schedContainer}>
                    <div style={schedHeading}>
                        SESSION 2 Tuesday 6AM<br/> ({formatDate(schedules.workshopDate2, true)})
                    </div>
                    <div style={schedBody}>
                        You’ll discover how to maximize profitability by placing the right prices of your grocery products. You will also learn how to make people buy more from you instead of that in your competitor or in the supermarket.
                    </div>
                </div>
                <div style={schedContainer}>
                    <div style={schedHeading}>
                        SESSION 3 Wednesday 6AM<br/> ({formatDate(schedules.workshopDate3, true)})
                    </div>
                    <div style={schedBody}>
                        You’ll learn where and how to get regular customers from different people on social media.
                    </div>
                </div>
                <div style={schedContainer}>
                    <div style={schedHeading}>
                        SESSION 4 Thursday 6AM<br/> ({formatDate(schedules.workshopDate4, true)})
                    </div>
                    <div style={schedBody}>
                        The website you’ll be getting was not merely design for grocery only. On this session, I’ll show you where and how to get other products that you can sell on your website on top of grocery products. This way… You’ll earn much more!
                    </div>
                </div>
                <div style={schedContainer}>
                    <div style={schedHeading}>
                        SESSION 5 Friday 6AM<br/> ({formatDate(schedules.workshopDate5, true)})
                    </div>
                    <div style={schedBody}>
                        You’ll learn the fastest way to earn your first million thru the right and latest techniques to acquire lots of customers.
                    </div>
                </div>
            </div>
            <br />

            Although these lessons will be sent to you via email at 6AM per day but since these are all recorded videos, you can watch the lessons anytime of the day when you are already vacant.
            <br /><br />
            
            <div style={{...schedContainer, width: "100%"}}>
                <div style={schedHeading}>
                     {formatDate(schedules.workshopDate6, true)} Or Every Saturday at 8PM (Live Q and A Session)
                </div>
                <div style={schedBody}>
                    Every Sunday at 8PM we will do a 15 Minute Presentation, 1 Hour Website Checking, and 1 Hour Q And A Session. Videos are also recorded for those who can't attend. 
                </div>
            </div>
            <br />

            <b>Q: What if I am busy? How can I attend the workshop?</b>
            <br /><br />

            Answer: All the instructions are being sent to you with a recorded videos and these lessons will be sent every 6 AM each day <u>so you'll have enough time to watch it</u>. Also, if you cannot attend the Live Q and A session, I will also send you a recorded copy of it.
            <br /><br />

            So here are the things you'll be getting on the Main Phase of the program:
            <br /><br />

            <ol>
                <li>
                    Full version of Grocery eCommerce Website with grocery items already uploaded into it!
                </li>
                <li>
                    Recorded videos of the 5 workshops.
                </li>
                <li>
                    Recorded videos for the Live Q and A Session.
                </li>
                <li>
                    <b>Downloadable Video Copy</b> - You can watch it as many time as you want even without an internet connection. You can watch the lessons during your breaktime or before you go to sleep.
                </li>
            </ol>

            <b>Q: What if I am an OFW how can I start this business?</b>
            <br /><br />

            I understand you can't start this business at this time kasi nasa ibang bayan ka pa, but...
            <br /><br />

            <ul>
                <li>
                    This is a great opportunity for you now because while you are away you can learn this business through OGPA Program and when time comes you'll <b><u>get back here in the Philippines</u></b> you can start the business right away.
                </li>
                <li>
                    You can watch the lessons during your free time in your apartment and even you can review it when you go back here in the Philippines.
                </li>
                <li>
                    However, if you have someone here (yung pwede mong mapagkatiwalaan like your relatives or a member of the family) who can do the logistics, <b><u>then you can start the business kahit nasa abroad ka pa</u></b>.
                </li>
            </ul>

            <center><h2 style={{color: "green"}}>The Operation Phase</h2></center>
            <br />

            Now, after the 1st phase you must have a running Online Grocery Business and ready to accept orders. In order to start <b style={{color: "darkviolet"}}>earning real profit from this business</b>, we will submerge your Online Grocery into an <u>actual marketing and sales activity</u>.
            <br /><br />

            This will happen upon entering and starting the 2nd Phase. For the next 6 weeks ({formatDate(schedules.dateStart2, true)} – {formatDate(schedules.dateEnd2, true)}), <u>we will give our full attention</u> on <b style={{color: "brown"}}>making your first sale</b> and having a lot of customers.
            <br /><br />

            Even though you have learned some <u>techniques on how to get clients</u> on the 1st Phase but on this phase, we will go and dig dive deep on getting not just one customer but <b style={{color: "red"}}><u>multiple clients that will regularly buy grocery products from you</u></b>.
            <br /><br />

            With the help of our <b><u>marketing experts</u></b>, you will receive <u>another sets of lessons</u> that will provide an instructions regarding your 2nd phase’s weekly task. You will going to perform these task in order <b style={{color: "green"}}>to find a lot of customers</b>.
            <br /><br />

            <center><h2 style={{color: "green"}}>The Ultimate Phase</h2></center>
            <br />

            Finally on the last phase ({formatDate(schedules.dateStart3, true)} – {formatDate(schedules.dateEnd3, true)}), we will <b><u>start building your physical grocery store</u></b> for another 4 weeks. You really don’t need to build a physical building for your store. You can actually use some space in your house where you can safely store grocery stocks.
            <br /><br />

            All you need is to access our <b style={{color: "darkviolet"}}>e-Supplier Platform</b> where you can find <u>grocery suppliers within your location</u> and have them supply grocery items to you. On the last phase also, we will going to start setting up your <u>Mobile Application for your online grocery</u>. This way you can reach more customers specially those who prefer mobile apps to order.
            <br /><br />

            <b>Q: Paano kung meron na akong existing na sari-sari store or grocery store?</b>
            
            <br /><br />

            <ul>
                <li>
                    Kung meron ka nang existing na tindahan pwede mong gawin is to <b><u>upgrade it into online grocery</u></b>. The process is very simple, still follow all the lessons
                    I’ll be giving you on the OGPA Program, <b style={{color: "darkgreen"}}>get also the Grocery Website</b>.
                </li>
                <li>
                    Once an order has been made by a customer, those products na inorder ng customer na <u>andun na sa tindahan mo kukunin mo nalang deretso</u> dun. At yung wala yan yung
                    kukunin mo sa pinakamalapit na supermarket or supplier that we will link to you.
                </li>
            </ul>

            <center><h2 style={{color: "darkorange"}}>Wait, there's more…</h2></center>
            <br />

            You'll also get access to this valuable resources and support group.
            <br /><br />

            <span style={{ color: "darkgreen" }}>&#10004; Access To The Readymade Marketing Funnels</span>
            <br />

            <ul>
                <li>
                    When people sees your website, 98% of them won't buy immediately. It will take you so much effort to follow-up them one by one. But with a <b>Readymade Marketing Funnel</b>,
                    the system will do that for you even if you already have 10,000 or 1 million customers.
                </li>
            </ul>

            <span style={{ color: "darkgreen" }}>&#10004; Access To Affiliate Marketers</span>
            <br />

            <ul>
                <li>
                    When you establish an Online Grocery Business thru this program, our <b><u>Affiliate Marketers</u></b> will see your website. These are the people who will promote your online grocery business behind.
                </li>
                <li>
                    This way you don't need to hire people to market your business because instantly <span style={{ color: "red" }}>there are already hundreds of people who are waiting</span> for you to establish an
                    online grocery business. <b style={{ color: "red" }}>Once you've established it, they'll bring people to your website</b>.
                </li>
            </ul>

            <span style={{ color: "darkgreen" }}>&#10004; Download The Supplier Proposal Template</span>
            <br />

            <ul>
                <li>
                    Using this template you’ll have a high probability that you can get grocery supplies directly from the supermarket at time you are still in the 1st phase. This is the exact template I use when
                    I send proposal to the supermarket. You can download it, change my name and my company name to yours. I’ll talk more about it later…
                </li>
            </ul>

            <span style={{ color: "darkgreen" }}>&#10004; Join Our Weekly Meetup With All The Online Grocery Owners</span>
            <br />

            <ul>
                <li>
                    I'm not the only one who can help you building this business. We have a community of online grocery business owners who can also help you and we conduct exclusive webinar once a month. You'll
                    get instant access on this webinar and have a <u>chance to get to know to my other students who do the same business</u>. <b style={{ color: "red" }}>You may also know their strategy and ask
                    some questions to them!</b>
                </li>
            </ul>

            Let me show you some of them...
            <br /><br />
            
            <b>Listen To What They Have To Say</b>
            <br /><br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={NickTrinidad} alt="NickTrinidad" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Nick Trinidad, owner of Pagsanjan Online Grocery, an online grocery in Pagsanjan.</h5>

                    <i>
                        "The OGPA Program is best and I highly recommend this training to others who wanted to own an online grocery business. All the modules are good and with pertinent details.
                        I'm <b>optimistic that anyone who start an online grocery business will succeed</b> because the <u>training's topic is relevant to our present lifestyle</u> where we need time - <b>'Time is Valuable than Money'</b>."
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={ArmanViacrucis} alt="Arman Viacrucis" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Arman Viacrucis, owner of Viamart, an online grocery in Baguio City.</h5>

                    <i>
                        "I was already thinking this business noong una until I find this program and it enables me to start right away."
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={RosalindaRayo} alt="Rosalinda Rayo" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Rosalinda Rayo, owner of Aling Linda Sari-sari Store Online, an online grocery in Pasig City.</h5>

                    <i>
                        "I am really grateful for helping me along the way, sir Francis Clavano, everyday is a learning process even <b>after the 5 days workshop</b>.
                        Nothing is too small to know, and <u>nothing is too big to attempt</u>. Maraming salamat for having good intentions to help our kababayan by sharing your
                        ideas and for reaching out. God bless!"
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={JunneferGabinete} alt="Junnefer Gabinete" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Junnefer Gabinete, owner of JL Toledo Online Grocery, an online grocery in Toledo City.</h5>

                    <i>
                        "Maraming salamat po sa mga trainings na binigay mo sa akin at salamat din po sa <b><u>ginawa mong fully loaded items na website</u></b>, marami po akong natutunan dito, at
                        <u>napakalaking tulong po ito sa aking pagsisimula</u> ng online grocery business."
                    </i>        
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={SalvacionCaranay} alt="Salvacion Caranay" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Salvacion Caranay, owner of 7Wonders Shopping Online in Pasay City.</h5>

                    <i>
                        "Great Day Everyone! I want to Thank and Praise God for the Great Opportunity shared by Francis Clavano because from the start of the OGPA Program up to the last day.
                        <u>It provided me a Mission and Vision of impacting lives</u> by sharing this opportunity. For me, Through OGPA Program, <b>formulate me to Achieve My Financial Goals</b> in Life
                        thru building my own Online Grocery Business!!!

                    </i>        
                </div>
            </div>
            <br />

            They are just a few of my students who are now experiencing the fruits of having an Online Grocery Business thru OGPA Program.
            <br /><br />

            <center><h2 style={{color: "green"}}>How Much Is This Program?</h2></center>
            <br />

            By now, you must be excited to enroll in this <b>premier program and start making serious money online</b>. But before I jump into the details, let's compare first a traditional business
            like a <u>physical grocery store vs. an online grocery business</u> that I'm sharing to you.
            <br /><br />

            If you choose to start a physical grocery store first, <span style={{ color: "red" }}>you'll need a minimum of 1 Million pesos for the building cost</span>. Second, you'll need an initial
            stock worth P500,000. At kung gusto mo sa magandang location, yung matao like yung malapit sa market, expect an additional P75,000 per month and a P225,000 for three months security deposit.
            <br /><br />

            In total, you'll need at least P1,725,000 to start a grocery outlet business. <u>Initial expense pa lang yan ha, wala pang monthly operational expenses tulad ng bayad sa tubig at kuryente</u>.
            No doubt, it requires you to invest a lot of money at mahirap pang humanap ng empleyado na mapagkakatiwalaan mo. <u>Yung hindi ka kukupitan, lolokohin, at lalayasan</u>.
            <br /><br />

            Fact is, not many Pinoys have P1,725,000 savings to invest in a physical grocery business. <i style={{ color: "red" }}>Napakalaking halaga niyan</i>.
            <br /><br />

            On the other hand, I can <u>teach you how to start an online grocery business</u> that you can run part-time from home and can give you <b style={{ color: "red" }}>P50,000, P100,000, or even P1 Million per month of income</b>.
            But I will not ask you to invest P1,725,000 as enrollment fee, that's a very big amount. Not even half of that which is P850,000, or P250,000.
            <br /><br />

            Similarly, if you build an online grocery business on your own (without attending the OGPA Program).
            <br /><br />

            <span style={{ color: "purple" }}>"You will need to hire a website programmer to create an ecommerce website and mobile apps for you. It would need at least P100,000. This includes professional fee, 1 year web hosting, and maintenance fee</span>.
            <br /><br />

            Aside from that, you will also need to hire somebody to go to the nearest supermarket or grocery store to list all the grocery items <i>(name, price, SKU, etc. Even the pictures)</i>.
            And you need somebody to constantly <b>check and update all the prices</b>. That will incure you another cost of around 30,000 pesos for the labor. That will cost you another 20,000 pesos for the labor.
            <br /><br />
            
            All in all you would need P120,000 for the website and uploading of grocery items to establish an online grocery business on your own.
            <br /><br />
            
            <h5 style={{color: "darkred"}}>That is still a pretty huge amount!</h5>
            <br />

            However, to attend in <b style={{ color: "green" }}>Online Grocery Prosperity and Abundance Program</b> (which includes the website, mobile apps, uploading of grocery items and monitoring its prices),
            the enrollment fee is only <b style={{color: "darkblue"}}>P56,990, spread into 3 months installment</b>. That's a little investment compared to what you’ll need in starting a high-risk business first like a physical grocery outlet.
            <br /><br />

            Remember, <u>I'll train you in a one on one mentoring and you will have priority Facebook or email access to me during the program</u> especially on the Q and A sessions. Plus, you'll also get access to my private Facebook group where you'll receive a <b>LIFETIME support from our growing community of online grocery owners</b>.
            <br /><br />

            Oh by the way, I may also <b style={{color: "red"}}>give big discounts to people who will enroll into this program earlier</b>. See if there is discount today by continuing reading this up to the end. Now aside from the discount that I'll be giving you when you watch this whole video and after enrolling on this program, you will also be receiving this amazing bonuses:
            <br /><br />

            <center><h2 style={{color: "green"}}>Bonus #1: Facebook Ads Consultancy</h2></center>
            <br />

            Aside from the intensive lessons you will be getting on this program, I will also become your FB Ads Consultant.
            <br /><br />
            
            If you want to get a <u>lot of customers with lesser effort</u> in finding them. <b style={{color: "red"}}>FB Ads is the best strategy for that!</b> After you have successfully followed all the instructions
            I’ll be giving you on the 5 days workshop… <u>You can start getting some clients</u>.
            <br /><br />

            But, in order for you to get multiple customers, and have all of them buying regularly, you need to take your business on Facebook Advertising. I’ve been an <b>FB Ads consultant</b>
            for some quite time on some businesses, some of their ads are being manage by me and they pay me 35,000 to 75,495 pesos a month.
            <br /><br />

            <h5 style={{color: "darkred"}}>But on the program, I will going to be your FB Ads consultant for FREE</h5>
            <br /><br />

            <center><h2 style={{color: "green"}}>Bonus #2: Instant Access To The Owner’s Referral Program</h2></center>
            <br />

            I did not directly get all the 420 customers I've shown you a while ago. I only had 82 of them at first.
            <br /><br />

            <center><img src={BuyingCustomer} alt="Buying Customer" width="50%" /></center>
            <br />

            Then I encouraged these 82 customers to invite another 338 (420 - 82) people to buy groceries on my website.
            <br /><br />

            <h4 style={{color: "blue"}}>How did I do that?</h4>
            <br />

            Even before you plan to enroll on this program there are already a lot of Marketers on this program that are <u>ready to market your online grocery business</u>. Once you finish the program and
            establish your online grocery, <u>these marketers will do the marketing and promotion</u> for you.
            <br /><br />

            <b style={{ color: "darkorange" }}>They will be the one who will find customers for you!</b>
            <br /><br />
            
            These marketers are being listed in a system called <b style={{color: "green"}}>Owner’s Referral Program</b> and you'll be given <u>instant access to that once you enroll to this program</u>. The value of this Owner’s
            Referral Program is about P15,000 but still you will get it for Free after enrolling and finishing the program.
            <br /><br />

            <center><h2 style={{color: "green"}}>Bonus #3: Proposal Template</h2></center>
            <br />

            You will be given a dedicated link where you can <u>download the <b>Proposal Template!</b></u> This is a readymade template where you just change my name and my company name,
            submit it to Supermarket management. Once a customer orders in your website, supermarkets will then be the one <u style={{color: "red"}}>who’ll do the packing</u> of grocery items for you.
            <br /><br />

            <h4 style={{ color: "darkorange" }}>What great is that some supermarket can even do the delivery for you!</h4>
            <br />

            This way you don't need to have a delivery vehicle or to tap a courier provider which means you can have a <u style={{color: "#1E90FF"}}>business that you can do at the comfort of your home</u>.
            <br /><br />

            The value of this template is P10,000, <b style={{color: "red"}}>I will give it to you  absolutely Free</b>.
            <br /><br />

            So kung pagsa-samasamahin natin lahat ng mga values na makukuha mo sa OGPA Program kasama na yung mga bonuses na nabanggit ko. You will get...
            <br /><br />

            <div style={bonusDiv}>
                <div align="left">
                    <span style={{ color: "darkgreen" }}>&#10004;</span> eCommerce Website
                </div>
                <div align="right">
                    <b>Php 100,000</b>
                </div>
            </div>
            <div style={bonusDiv}>
                <div align="left">
                    <span style={{ color: "darkgreen" }}>&#10004;</span> Uploading Of Grocery Items
                </div>
                <div align="right">
                    <b>Php 30,000</b>      
                </div>
            </div>
            <div style={bonusDiv}>
                <div align="left">
                    <span style={{ color: "darkgreen" }}>&#10004;</span> Bonus #1 FB Ads Consultancy
                </div>
                <div align="right">
                    <b>Php 75,495 </b>
                </div>
            </div>
            <div style={bonusDiv}>
                <div align="left">
                    <span style={{ color: "darkgreen" }}>&#10004;</span> Bonus #2 Owner’s Referral Program
                </div>
                <div align="right">
                    <b>Php 15,000 </b>
                </div>
            </div>
            <div style={bonusDiv}>
                <div align="left">
                    <span style={{ color: "darkgreen" }}>&#10004;</span> Bonus #3 Proposal Template
                </div>
                <div align="right">
                    <b>Php 10,000 </b>
                </div>
            </div>
            <br />

            All in all, the total value you will be getting on this program is <b>P230,495</b> but as I've said
            <br /><br />

            <b style={{color: "red"}}>You will not pay that much</b>
            <br /><br />

            Because to get all of what I've mention above, you only need to enroll to OGPA Program that has a value of <b>P230,495</b> to only <b style={{color: "red"}}>P56,990</b> and a <u>monthly hosting fee
            after 1 year of P550 per month</u>.
            <br /><br />
            
            <h4 style={{ color: "green" }}>That is kung wala pang discount. However, if you continue watching this video, you’ll be given a much more discount</h4>

            Heto naman yung mga sinasabi ng mga students ko regarding OGPA Program…
            <br /><br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={ValiantDominic} alt="Valiant Dominic" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Valiant Dominic D. Velarde, owner of Lets Get Go Online Grocery in Dumaguete City.</h5>

                    <i>
                        "OGPA Program is a <b>complete program</b> on how to start an online grocery business and yes I will definitely recommend it."
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={BernaCordero} alt="Berna Cordero" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Berna Cordero, owner of Your Helper On The Go in Kawit Cavite.</h5>

                    <i>
                        "Step by step and very detailed. Sir Francis ,our mentor is very accommodating with our questions. I am very thankful with this kind of opportunity. With the way Sir Francis
                        teaches how to market, <b><u>it is impossible for you not to earn</u></b>. Of course I will recommend OGPA Program to anyone!! <u>Hindi ka mapapahiya</u>!!! You just need to
                        have the passion to really start the business and go on."
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={MaryGracePasco} alt="Mary Grace Pasco" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Mary Grace Pasco, owner of Mary Mart in Montalban Rizal.</h5>

                    <i>
                        "OGPA Program is a very comprehensive guide for those people who wants to have an ecommerce store like me.
                        <u>You will learn a lot from it</u>. Sir Francis is a very nice coach, <b>he makes a point that he will answer all our queries about
                        online grocery business</b> and yes of course, <b style={{color: "red"}}>I will recommend OGPA Program to everyone.</b>"
                    </i>
                </div>
            </div>
            <br />

            <div style={testimony}>
                <div align="center" style={testImage}>
                    <img src={MaritesGuzman} alt="Marites De Guzman" width={isMobile ? "50%" : "234px"} />
                </div>
                <div>
                    <h5 style={{ color: "darkblue" }} >Marites de Guzman, owner of Get Well Online Groceries Store in Quezon City.</h5>

                    <i>
                        "Kahit sobrang late po ako sa lessons <b>kasi I work full time as purchaser</b>. Pag uwi ko ng bahay saka ko pa lang magagawa yung OGPA Program,
                        and I find it very easy to understand from lesson 1 <u>makakasabay ka sa mga instructions</u>. Video na sobrang hands on sa mga members.
                        Mentors by far will lead to your dreams of having an online business. Never pa akong na invite to any online venture <b><u>kasi feeling ko mga scam,
                        pero this is 100% guaranted hindi scam</u></b>. Very Commendable at accessible ang mentor."
                    </i>        
                </div>
            </div>
            <br />

            <b>NGAYON...</b> since kaka-revise ko palang ng program na to and I want to test the effectiveness of this newly revised workshop, I want you to test
            the <u>effectiveness of this program muna by giving you a <b style={{ color: "red" }}>lower enrollment price</b></u>.
            <br /><br />

            So I will <span style={{color: "blue"}}>bring down the enrollment fee from 56,990 to only P{amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} (pay 3 months installment)</span> but only for this schedule.
            <br /><br />

            Yes! For only <b style={{color: "green"}}>P{amount.installAmount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</b> you will get the Grocery <u>eCommerce Website</u> which includes a <u>Domain Name</u> so you can brand your business, a <u>Mobile App</u>,
            the <u>5 Workshop Lessons</u>, the copying of grocery items, and the 3 bonuses.
            <br /><br />

            <h4 style={{color: "red"}}>That's P{(56990 - amount.installAmount).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} less! </h4>
            <br />

            <b>But Wait...</b> <span style={{ color: "red" }} >I have some CAUTION if you are going to operate your own online grocery business!!!</span>
            <br /><br />

            Operating your online grocery business also means you need to keep <u>monitoring your grocery prices</u> and have it updated regularly.
            <br /><br />

            When I was starting, I lost enormous amount of money because I am not constantly updating prices in some of my grocery products.
            Minsan pa nga, nalulugi ako kasi yung presyo na binayad ng customer ay ang presyo nung hindi pa updated ang price. Yung mababa pa lang!
            <br /><br />

            But if you are the first 20 person who will take action and enroll OGPA Program right now, you are entitled to our <b style={{color: "green"}}>Price Change Monitoring Program (PCMP)</b>
            <br /><br />

            Instead of you who keeps monitoring the prices, we will do it for you and we will automatically update it into your website!!!
            <br /><br />

            But take note that exclusive lang itong Price Change Monitoring Program sa first 20 person who will go through the program.
            Right now, there are already {spotTaken} people that jump in to this program. So, {spotLeft} spots nalang yung natitita.
            Once all the spot have been taken or until 11:59 PM of {formatDate(schedules.registerEnd, true)}, whichever comes first, we will end the enrollment for the program.
            <br /><br />

            {showInitButton && <>
                <div align="center">
                    <span style={{color: "red"}}>Click the BUTTON below to Enroll NOW!!!</span>
                    <br /><br />

                    <button
                        type="button"
                        className="btn-primary btn-lg"
                        style={{ fontSize: isMobile ? 18 : 30, padding: isMobile ? "15px 40px" : "15px 80px", marginBottom: 20 }}
                        onClick={() => handleButtonClick()}
                    >
                        Click Here To ENROLL Now <RightCircleOutlined />
                    </button>
                </div><br />
            </>}
            
            One more thing, to make this deal even sweeter for you I'm also giving you a…
            <br /><br />

            <center><h1 style={{color: "green"}}>100% Money Back Guarantee</h1></center>
            <br />

            <center><img src={MoneyBackGuarantee} alt="Money Back Guarantee" width={isMobile ? "100%" : "500px"} /></center>
            <br />

            How would you know if the program is right for you? You try it and see for yourself right? And this is what I'm offering you right now.
            <br /><br />

            <h4 style={{color: "green"}}>This is how it works…</h4>
            <br />

            Enroll in this program and then request for the website on the first day (make sure you request it on the first day). <u>Once you receive
            the website and if you're not happy with it, for whatever reason</u> (kahit di mo lang trip yung looks ng website mo), just email me before
            the second day upon receiving it and <b  style={{color: "darkred"}}><u>I will give you a FULL refund</u></b>.
            <br /><br />

            <b style={{color: "red"}}>No questions asked. No hard feelings. Friends pa din tayo.</b>
            <br /><br />

            I'm sure you'll agree that not many trainings or programs can give you a <b style={{ color: "red" }}>money back guarantee</b>.
            Why? Because many people can claim they can teach you how to create an online store business but <u style={{ color: "green"}}>only few can back it up with actual income results</u>.
            <br /><br />

            Modesty aside, I sold over <u>1 Million Pesos of grocery products in the last 12 months</u> operating my own online grocery business.
            And I have lots of students that can attest to how my <b  style={{color: "blue"}}>mentoring program</b> abled them to do exactly the same way too.
            <br /><br />

            That's why <b>I have the "guts" to offer you a <span style={{ color: "red" }}>100% money back guarantee</span></b>. If you decided to back out before our 2nd session,
            <span style={{ color: "darkorange"}}>send me yospanr bank account information and I'll deposit the full refund to your bank account</span>.
            <br /><br />

            Or if you enrolled with your credit card I will credit it back to you in 3-5 business days (refund processing cost for card payments may apply).
            <br /><br />

            <b style={{ color: "purple" }}>You won't find any better deal than this.</b>
            <br /><br />

            But wait, I am not finish yet! Here's the craziest deal that you won't find anywhere else because I'm also giving you an...
            <br /><br />

            <center><img src={ActoionTakerGuarantee} alt="Actoion Taker Guarantee" style={{width: "70%"}} /></center>
            <br />

            Now this is how it works.
            <br /><br />

            Enroll in this program and then go through all the sessions
            <br /><br />

            <b><u>If you have gone through all these (register the website on-time, completed the 5 days workshop, attended the Live Q and A Session)
            and follow all the instructions I have provided in the workshop and other lessons in the 2nd phase but after 45 days from your first lesson or after the 2nd Phase you wont get any single sale,</u></b>
            <br /><br />

            I will refund you 100% of  what you pay within 3 days!
            <br /><br />

            Yes!  That's how confident I am that if you really follow all the instructions I'll give you on the program, I can guarantee that you will earn a lot of money.
            <br /><br />

            <b style={{ color: "red" }}>Note: You need to exactly <u>follow all my instructions in the 5 sessions</u>, attended the Live Q and A and if you can provide me proof
            that you did all the instructions specially in the 2nd Phase but did not have a single sale after 45 days, then I'll refund you all of what you pay now in the next 3 days.</b>
            <br /><br />

            Isn't that an extra ordinary deal? You won't find any deal like that to other offer!
            <br /><br />

            <b>Question... Meron na bang successfully nakapag-parefund after 45 days?</b>
            <br /><br />

            <b style={{color: "blue"}}>Sagot... WALA.</b>   Dahil lahat ng nag-undergo ng program na to na ginawa ang lahat ng mga pinapapagawa ko ay <b style={{color: "green"}}>nagkaroon talaga ng maraming sales!</b>
            <br /><br />

            And now they are <u>successfully operating their online grocery business</u> and continually earning <b style={{color: "darkorange"}}>multiple figure income a month</b> because they exactly 
            follow all the things they have learned on the program.
            <br /><br />

            Alright, I guess you have all the things you wanted to hear from this program. <b style={{ color: "red" }}>Nothing more to lose to enroll now!</b>
            All you need to do is grab your spot by <u>clicking the button below to register</u> as there are only limited people we can accept on this program.
            <br /><br />
        </div>
    );
}
 
export default OgpaContent;