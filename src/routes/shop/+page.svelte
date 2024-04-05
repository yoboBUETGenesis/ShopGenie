<script>
// @ts-nocheck
    import { onMount } from 'svelte';
    import json from '../../dataset.json'

		import genie from '$lib/images/genie.png'
    let jsonData;
    let data;
    
    onMount( async()=> {
        try {            
            const catagorys = new Set()
            for(let i=0 ; i< json.length; i++){
                catagorys.add(json[i].Category)
            }

            catagorys.forEach(value=>{
                console.log(value)
            })
            
        }catch (error) {
            console.error(error);
        }
    })
</script>

<div>
    
    <div class="relative">
        <!-- <div class="h-[100vh] w-full absolute top-0 bg-slate-500 secondAnimation">
            
        </div> -->
        <div class="h-[100vh] w-full absolute top-0 bg-blue-500 firstAnimation">
            
        </div>
    </div>
        <div class="flex flex-col gap-4 w-52 p-5">
           
            <div class="skeleton h-32 w-full"></div>
            <div class="skeleton h-4 w-28"></div>
            <div class="skeleton h-4 w-full"></div>
            <div class="skeleton h-4 w-full"></div>
        </div>
    <div>
        
    </div>

</div>


<style>

    @keyframes leftToRight{
        0% {
            transform: translateX(0);
        }
        100% {
            transform: translateX(-100%);
        }
    }
    @keyframes rightToLeft{
        0% {
			transform: translateX(0);			
        }
        100% {
            transform: translateX(100%);
        }
    }

    .firstAnimation{
        animation: leftToRight 1s ease-in-out forwards;
    }
    .secondAnimation{
        animation: rightToLeft 1s ease-in-out  forwards;
        animation-delay: 1s;
    }

</style>