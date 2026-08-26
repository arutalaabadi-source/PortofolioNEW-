/* LOADER */
window.addEventListener("load",()=>setTimeout(()=>document.getElementById("loader")?.classList.add("hide"),650));

/* MOBILE MENU */
const menuBtn=document.getElementById("menuBtn");
const navMenu=document.getElementById("navMenu");
menuBtn?.addEventListener("click",()=>navMenu.classList.toggle("open"));
document.querySelectorAll(".nav-link").forEach(a=>a.addEventListener("click",()=>navMenu.classList.remove("open")));

/* SCROLL REVEAL */
const revealObserver=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){entry.target.classList.add("show");revealObserver.unobserve(entry.target)}
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>revealObserver.observe(el));

/* ACTIVE NAV */
const sections=[...document.querySelectorAll("main section[id]")];
const navLinks=[...document.querySelectorAll(".nav-link")];
window.addEventListener("scroll",()=>{
  let current="home";
  sections.forEach(section=>{if(window.scrollY>=section.offsetTop-180) current=section.id});
  navLinks.forEach(link=>link.classList.toggle("active",link.getAttribute("href")==="#"+current));
},{passive:true});

/* NAVBAR */
const navbar=document.querySelector(".navbar");
window.addEventListener("scroll",()=>navbar.style.background=window.scrollY>50?"rgba(8,11,20,.94)":"rgba(8,11,20,.72)",{passive:true});

/* HERO PARALLAX */
const heroVisual=document.querySelector(".hero-visual");
document.addEventListener("mousemove",e=>{
  if(!heroVisual||window.innerWidth<900)return;
  const x=(innerWidth/2-e.clientX)/100,y=(innerHeight/2-e.clientY)/100;
  heroVisual.style.transform=`translate(${x}px,${y}px)`;
});

/* PROJECT DATA */
const projects={
  warehouse:{category:"Warehouse",title:"Finished Goods Warehouse",description:"Process improvement and digitalization of Finished Goods warehouse operations.",images:["images/projects/warehouse/1.jpg","images/projects/warehouse/2.jpg","images/projects/warehouse/3.jpg"],tools:["BPMN","AppSheet","Google Sheets","Warehouse Management"],results:["Improved control of Finished Goods inventory","Improved In/Out transaction recording","Supported better stock monitoring","Reduced manual recording activities"]},
  bpr:{category:"Process Improvement",title:"Business Process Reengineering",description:"Redesigning warehouse processes to reduce unnecessary activities and improve operational efficiency.",images:["images/projects/bpr/1.jpg","images/projects/bpr/2.jpg","images/projects/bpr/3.jpg"],tools:["BPR","PAM","BPMN","Process Improvement"],results:["Reduced unnecessary process activities","Improved process flow","Eliminated non-value-added activities","Created a more efficient warehouse process"]},
  inventory:{category:"Digitalization",title:"Inventory Digital System",description:"Digital recording system for goods In/Out using AppSheet and barcode scanning.",images:["images/projects/inventory/1.jpg","images/projects/inventory/2.jpg","images/projects/inventory/3.jpg","images/projects/inventory/4.jpg"],tools:["AppSheet","Barcode","Google Sheets","Dashboard"],results:["Digitalized goods In/Out transactions","Supported real-time transaction recording","Reduced manual data entry","Improved stock monitoring"]},
  layout:{category:"Facility Planning",title:"Facility Layout Planning",description:"Factory and office layout design to support better material and activity flow.",images:["images/projects/layout/1.jpg","images/projects/layout/2.jpg","images/projects/layout/3.jpg"],tools:["Layout","Flow Analysis","AutoCAD","Facility Planning"],results:["Improved material flow","Optimized workspace utilization","Reduced unnecessary movement","Supported better facility organization"]}
};

/* PROJECT MODAL */
const modal=document.getElementById("projectModal");
const modalClose=document.getElementById("modalClose");
const modalTitle=document.getElementById("modalTitle");
const modalCategory=document.getElementById("modalCategory");
const modalDescription=document.getElementById("modalDescription");
const modalImage=document.getElementById("modalImage");
const thumbs=document.getElementById("thumbs");
const modalTools=document.getElementById("modalTools");
const modalResults=document.getElementById("modalResults");
const prev=document.getElementById("prevImage");
const next=document.getElementById("nextImage");
let activeProject=null;
let activeIndex=0;

function openProject(id){
  const project=projects[id];
  if(!project)return;
  activeProject=project;activeIndex=0;
  modalCategory.textContent=project.category;
  modalTitle.textContent=project.title;
  modalDescription.textContent=project.description;
  modalTools.innerHTML=project.tools.map(x=>`<span>${x}</span>`).join("");
  modalResults.innerHTML=project.results.map(x=>`<li>${x}</li>`).join("");
  thumbs.innerHTML=project.images.map((src,i)=>`<button class="thumb ${i===0?"active":""}" data-index="${i}" aria-label="Open image ${i+1}"><img src="${src}" alt="${project.title} - image ${i+1}"></button>`).join("");
  thumbs.querySelectorAll(".thumb").forEach(btn=>btn.addEventListener("click",()=>showImage(Number(btn.dataset.index))));
  showImage(0);
  modal.classList.add("open");
  modal.setAttribute("aria-hidden","false");
  document.body.classList.add("modal-open");
}
function showImage(index){
  if(!activeProject)return;
  const total=activeProject.images.length;
  activeIndex=(index+total)%total;
  modalImage.style.opacity="0";
  setTimeout(()=>{
    modalImage.src=activeProject.images[activeIndex];
    modalImage.alt=`${activeProject.title} - image ${activeIndex+1}`;
    modalImage.style.opacity="1";
  },100);
  thumbs.querySelectorAll(".thumb").forEach((el,i)=>el.classList.toggle("active",i===activeIndex));
}
function closeProject(){
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden","true");
  document.body.classList.remove("modal-open");
}
document.querySelectorAll(".project-link").forEach(btn=>btn.addEventListener("click",()=>openProject(btn.dataset.project)));
prev.addEventListener("click",()=>showImage(activeIndex-1));
next.addEventListener("click",()=>showImage(activeIndex+1));
modalClose.addEventListener("click",closeProject);
document.querySelector(".modal-backdrop").addEventListener("click",closeProject);
document.addEventListener("keydown",e=>{
  if(!modal.classList.contains("open"))return;
  if(e.key==="Escape")closeProject();
  if(e.key==="ArrowLeft")showImage(activeIndex-1);
  if(e.key==="ArrowRight")showImage(activeIndex+1);
});
