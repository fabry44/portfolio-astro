import{j as e,m as o}from"./proxy.cbdk8VBq.js";import{r as n}from"./index.DTD2g3-w.js";const u=()=>{const[r,t]=n.useState({firstName:"",lastName:"",email:"",phone:"",message:""}),[i,s]=n.useState(""),c=async a=>{a.preventDefault(),s("Envoi en cours...");const l=await fetch("http://localhost:8000/api/contact",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)}),d=await l.json();l.ok?(s("Message envoyé avec succès !"),t({firstName:"",lastName:"",email:"",phone:"",message:""})):s(`Erreur : ${JSON.stringify(d.errors)}`)};return e.jsxs("form",{onSubmit:c,className:"max-w-md mx-auto",children:[e.jsxs("div",{className:"flex flex-wrap mx-3 mb-6",children:[e.jsx("div",{className:"w-full md:w-1/2 px-3 mb-6 md:mb-0",children:e.jsx("div",{className:"relative z-0 w-full mb-5 group",children:e.jsx("input",{type:"text",value:r.firstName,onChange:a=>t({...r,firstName:a.target.value}),className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",placeholder:"Prénom",required:!0})})}),e.jsx("div",{className:"w-full md:w-1/2 px-3",children:e.jsx("div",{className:"relative z-0 w-full mb-5 group",children:e.jsx("input",{type:"text",value:r.lastName,onChange:a=>t({...r,lastName:a.target.value}),className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",placeholder:"Nom",required:!0})})})]}),e.jsxs("div",{className:"flex flex-wrap -mx-3 mb-6",children:[e.jsx("div",{className:"w-full md:w-1/2 px-3 mb-6 md:mb-0",children:e.jsx("div",{className:"relative z-0 w-full mb-5 group",children:e.jsx("input",{type:"email",value:r.email,onChange:a=>t({...r,email:a.target.value}),className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",placeholder:"Email",required:!0})})}),e.jsx("div",{className:"w-full md:w-1/2 px-3",children:e.jsx("div",{className:"relative z-0 w-full mb-5 group",children:e.jsx("input",{type:"tel",value:r.phone,onChange:a=>t({...r,phone:a.target.value}),className:"block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer",placeholder:"Téléphone",required:!0})})})]}),e.jsxs("div",{className:"relative z-0 w-full mb-5 group",children:[e.jsx("label",{className:"peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6",children:"Message"}),e.jsx("textarea",{value:r.message,onChange:a=>t({...r,message:a.target.value}),className:"block py-2.5 px-0 w-full h-48 text-sm text-gray-900 bg-transparent border-2 border-gray-300 dark:text-white dark:border-gray-600 dark:focus:border-blue-500  focus:border-blue-600",placeholder:" ",required:!0})]}),e.jsx("button",{type:"submit",className:"bg-blue-500 text-white p-2 mt-2",children:"Envoyer"}),e.jsx("p",{children:i})]})},m={email:"fabienroy2@gmail.com",phone:"0650262098",address:"22 rue des Renardières 44100 Nantes"},p={user:m},f=()=>{const{user:r}=p;return e.jsx(o.section,{initial:{opacity:.3,x:0,y:0,scale:1},whileInView:{opacity:1,x:0,y:0,scale:1.15},transition:{duration:.8,delay:.2,ease:[.42,0,.58,1]},viewport:{once:!1,amount:.2},className:"flex justify-center items-center bg-section relative overflow-hidden",children:e.jsxs(o.div,{className:"flex flex-wrap -mx-3 mb-6 contactsection absolute z-10",initial:{opacity:0,x:95,y:60,rotate:341,scale:.1},whileInView:{opacity:1,x:0,y:0,rotate:0,scale:1},transition:{duration:1,ease:"easeOut",delay:.4},viewport:{once:!0,amount:.2},children:[e.jsx("div",{className:"w-full md:w-1/2 px-3 mb-6 md:mb-0",children:e.jsx(u,{})}),e.jsx("div",{className:"w-full md:w-1/2 px-6 mb-6 md:mb-0 flex justify-center items-center",children:e.jsxs("div",{className:"bg-light-secondary text-lg space-y-3 m-auto text-light-text dark:text-dark-text flex flex-col items-start",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Me contacter"}),e.jsxs("p",{children:[e.jsx("strong",{children:"Téléphone :"})," ",r.phone]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Email :"}),e.jsx("a",{href:`mailto:${r.email}`,className:"text-light-primary dark:text-dark-primary hover:underline",children:r.email})]}),e.jsxs("p",{children:[e.jsx("strong",{children:"Adresse :"})," ",r.address]})]})})]})})};export{f as default};
