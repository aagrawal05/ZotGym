return (
   <>
     <Head>
       <title>Zot GymMates</title>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
       <link href="https://fonts.googleapis.com/css2?family=Jersey+20&display=swap" rel="stylesheet"></link>
       <link rel="preconnect" href="https://fonts.googleapis.com"/>
       <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
       <link href="https://fonts.googleapis.com/css2?family=Hammersmith+One&family=Holtwood+One+SC&family=Jersey+20&display=swap" rel="stylesheet"></link>
     </Head>

     <div className={styles.container}>
       <header className={styles.navbar}>
         <img 
             src="https://brand.uci.edu/master-branding/marks/_img/BCeater-right-768x416.png"
             alt="peter"
             className={styles.peter}/>
         <div className={styles.logo}>Zot GymMates</div>  

         <div></div>
         <nav className={styles.navlinks}>
           <a>Find People</a>
           <a>Post PR</a>
           <a>Message</a>
           <a>Account</a>
         </nav>

        
       </header>
    
     <main className={styles.maincontent}>
       <div className={styles.textsection}>
         <h1>Looking for Gymmates?</h1>
         <button className={styles.ctabutton}>Find ZotMates</button>

       </div>
       <div className={styles.imagesection}>
         <img
           src="https://img.freepik.com/free-photo/group-people-exercising-together-outdoors_23-2151061449.jpg?semt=ais_hybrid"
           alt="Group workout"
           className={styles.workoutimage}
         />
       </div>
     </main>
   </div>
   </>
 );