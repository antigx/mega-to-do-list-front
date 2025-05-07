export default function TodayTasks (){
    return (
        <div className="mt-4 bg-white p-4 rounded shadow flex gap-5">
        <div className="flex w-full">
          
          <div className="flex flex-col gap-2 w-full my-2">
          <h3 className="text-md font-semibold">Suas tarefas de hoje:</h3>

            <div className="text-green-600 border-b border-green-600 pb-1">
              Levar lixo para fora
            </div>
            <div className="text-red-600 border-b border-red-600 pb-1">
              Terminar PS Mega Jr.
            </div>
          </div>

        </div>
        <div className="mt-2 text-right text-xl font-bold flex flex-col items-center justify-center">
          <h1 className="text-5xl">05</h1>
          <p className="text-lg">MAIO</p>
        </div>

      </div>
    )
}