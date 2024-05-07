/*
 *   File: task.tsx 
 *
 *   Purpose: Render the single task component
 *             
 *            
 *
 */ 

import '../style.css'

export default function Task({task}) {

return (
<div class="relative flex w-full max-w-[28rem] max-h-[30rem] flex-col rounded-xl bg-white bg-clip-border text-gray-700 shadow-lg">
  <div
    class="relative mx-4 mt-4 overflow-hidden text-white shadow-lg rounded-xl bg-blue-gray-500 bg-clip-border shadow-blue-gray-500/40">
    <img
      src="https://st4.depositphotos.com/17828278/24401/v/450/depositphotos_244011872-stock-illustration-image-vector-symbol-missing-available.jpg"
      alt="ui/ux review check" />
    <div
      class="absolute inset-0 w-full h-full to-bg-black-10 bg-gradient-to-tr from-transparent via-transparent to-black/60">
    </div>
  </div>
  <div class="p-6">
    <div class="flex items-center justify-between mb-3">
      <h5 class="block font-sans text-xl antialiased font-medium leading-snug tracking-normal text-blue-gray-900">
        {task.name}
      </h5>
      <p
        class="flex items-center gap-1.5 font-sans text-base font-normal leading-relaxed text-blue-gray-900 antialiased">
      </p>
    </div>
    <p class="block font-sans text-base antialiased font-light leading-relaxed text-gray-700">
    {task.description}
    </p>
    <div class="inline-flex flex-wrap gap-1 mt-8 group w-full justify-center">
      <span
  className={`cursor-pointer rounded-full border border-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:!opacity-100 group-hover:opacity-70 ${
    (() => {
      switch (task.taskTag) {
        case "Magazzino":
          return "bg-yellow-300 hover:border-yellow-900/100";
        break;
	case "Negozio":
          return "bg-red-300 hover:border-red-900/100";
        break;
	case "Riparazione":
          return "bg-teal-300 hover:border-teal-900/100";
	break;
        case "Feedback":
          return "bg-indigo-300 hover:border-indigo-900/100";
        break;
        case "Assistenza":
          return "bg-orange-300 hover:border-orange-900/100";
        break;
	default:
          return "bg-gray-900/5";
        break;
      }})()}`}>
         {task.taskTag}
      </span>
      <span
  className={`cursor-pointer rounded-full border border-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:!opacity-100 group-hover:opacity-70 ${
    (() => {
      switch (task.taskStatus) {
        case "Completata":
          return "bg-green-300 hover:border-green-900/100";
        break;
        case "In lavorazione":
          return "bg-yellow-300 hover:border-yellow-900/100";
        break;
        case "Da Eseguire":
          return "bg-red-300 hover:border-red-900/100";
        break;
        default:
          return "bg-gray-900/5";
        break;
      }})()}`}>
         {task.taskStatus}
      </span>
      <span
        class="cursor-pointer rounded-full border border-gray-900/5 bg-gray-900/5 p-3 text-gray-900 transition-colors hover:border-gray-900/10 hover:bg-gray-900/10 hover:!opacity-100 group-hover:opacity-70">
        ID: {task.taskid}
      </span>
    </div>
  </div>
  <div class="p-6 pt-3">
    <button
      class="block w-full select-none rounded-lg bg-blue-600 py-3.5 px-7 text-center align-middle font-sans text-sm font-bold uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
      type="button">
      apri
    </button>
  </div>
</div> 

/*
<>
<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
    <a href="#">
        <img class="rounded-t-lg" src="https://www.google.com/url?sa=i&url=https%3A%2F%2Fkare.ee%2Fen%2Fproduct%2Fpicture-frame-fragance-115115&psig=AOvVaw1pzLaR2E7k6ZcZXEq0zOFN&ust=1715159959245000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCOiGiPOa-4UDFQAAAAAdAAAAABAa" alt="" />
    </a>
    <div class="p-5">
        <a href="#">
            <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">TaskID: {task.taskid}</h5>
        </a>
        <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{task.description}</p>
        <a href="#" class="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Read more
             <svg class="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
            </svg>
        </a>
    </div>
</div>
</>
*/

 );
}
