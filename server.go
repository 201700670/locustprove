package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"strings"

	"github.com/gorilla/mux"
)

type Ram struct {
	Total      string `json:"total"`
	Porcentaje string `json:"porcentaje"`
	Usado      string `json:"usado"`
	Libre      string `json:"libre"`
}

type Cpu struct {
	Nucleo1 string `json:"nucleo1"`
	Libre1  string `json:"libre1"`
}

type Datos struct {
	Processos  string `json:"procesos"`
	StrProceso string `json:"strprocesos"`
}

//funcion que realizara Grafana
func metrica(w http.ResponseWriter, req *http.Request) {
	enableCors(&w) // habilitamos cors
	println("******** Cargar Datos para Grafana******")
	println("sopes")
	body, err := ioutil.ReadAll(req.Body)
	if err != nil {
		log.Fatalln(err)
	}
	if string(body) == "" {
		//fmt.Println(ioutil.ReadAll(req.Body))
		strfinal := `# HELP go_total_ram cantidad total.
	# TYPE go_total_ram gauge
	go_total_ram ` + "0"

		// enviamos en formato json los datos de la ram mediante peticion http
		fmt.Fprintf(w, strfinal)
	} else {
		split := []string{"", "", "", "", ""}
		split[0] = ""
		split[1] = "="
		split[2] = ""
		split = strings.Split(string(body), "=")
		if split[1] == "" {
			split[1] = "0"
		}

		fmt.Println(split[1])

		//fmt.Println(ioutil.ReadAll(req.Body))
		strfinal := `# HELP go_total_ram cantidad total.
# TYPE go_total_ram gauge
go_total_ram ` + split[1]

		// enviamos en formato json los datos de la ram mediante peticion http
		fmt.Fprintf(w, strfinal)
	}

}
func metricaGET(w http.ResponseWriter, req *http.Request) {

}
func main() {
	router := mux.NewRouter()
	router.HandleFunc("/metrics", metrica).Methods("POST")
	// levantamos el servidor en el puerto 4444
	fmt.Print("encendido")
	log.Fatal(http.ListenAndServe(":9798", router))
}

// esta funcion sirve para poder mandar peticiones a angular ya que habilita los cors
func enableCors(w *http.ResponseWriter) {
	(*w).Header().Set("Access-Control-Allow-Origin", "*")
}
