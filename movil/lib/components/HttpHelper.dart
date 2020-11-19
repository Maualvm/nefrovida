import 'dart:convert';
import 'package:movil/classes/Beneficiario.dart';
import 'package:movil/classes/DepuracionCreatinina.dart';
import 'package:movil/classes/ExamenOrina.dart';
import 'package:movil/classes/Jornada.dart';
import 'package:movil/classes/Microalbuminuria.dart';
import 'package:movil/classes/QuimicaSanguinea.dart';
import 'package:movil/classes/TipoNota.dart';
import 'package:movil/classes/Nota.dart';
import 'package:movil/classes/ConsultaNutricion.dart';
import 'package:http/http.dart' as http;

class HttpHelper {
  /*
    Para probarlo pongan su ip en vez de la mia.
    Eric: 192.168.42.123
    Mau:
    Jan: 192.168.42.50 / 192.168.42.138
    Saul:
    Randy:
  */
  String ip = "http://192.168.42.123";
  String baseUrl = ":8000/api";

  Future<List<Beneficiario>> getAllBeneficiarios() async {
    String path = "/beneficiarios";
    String uri = ip + baseUrl + path;
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      Beneficiarios listaBeneficiarios =
          new Beneficiarios.fromJsonList(decodedJsonMap['data']);
      return listaBeneficiarios.beneficiarios;
    } else {
      return null;
    }
  }

  Future<List<ConsultaNutricionGeneral>> getConsultasNutricion(
      idBeneficiario) async {
    String path =
        "/consultaNutricion/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      ConsultasNutricion listaConsultas =
          new ConsultasNutricion.fromJsonList(decodedJsonMap);
      return listaConsultas.consultasNutricion;
    } else {
      return null;
    }
  }

  Future<ConsultaNutricion> getDetalleConsulta(idConsultaNutricion) async {
    String path = "/consultaNutricion/" + idConsultaNutricion.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      ConsultaNutricion consulta;
      for (var item in decodedJsonMap) {
        consulta = new ConsultaNutricion.fromJsonMap(item);
      }
      return consulta;
    } else {
      return null;
    }
  }

  Future<List<NotaGeneral>> getNotas(idBeneficiario) async {
    String path = "/notas/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      Notas listaNotas = new Notas.fromJsonList(decodedJsonMap);
      return listaNotas.notasGenerales;
    } else {
      return null;
    }
  }

  Future<Nota> getDetalleNota(idNota) async {
    String path = "/nota/" + idNota.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      Nota nota;
      for (var item in decodedJsonMap) {
        nota = new Nota.fromJsonMap(item);
      }
      return nota;
    } else {
      return null;
    }
  }

  Future<List<TipoNota>> getAllTiposNotas() async {
    String path = "/tiponota";
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      TiposNotas listaTipos =
          new TiposNotas.fromJsonList(decodedJsonMap['data']);
      return listaTipos.tipos;
    } else {
      return null;
    }
  }

  Future<http.Response> subirNotra(String titulo, String contenido,
      int idBeneficiario, int idTipoNota, String url_archivo) async {
    String path = "/nota";
    String uri = ip + baseUrl + path;
    Map data = {
      'idBeneficiario': idBeneficiario,
      'idTipoNota': idTipoNota,
      'comentario': contenido,
      'tituloNota': titulo,
      'url_archivo': url_archivo
    };
    //encode Map to JSON
    var body = json.encode(data);

    var response = await http.post(uri,
        headers: {"Content-Type": "application/json"}, body: body);
    print("${response.statusCode}");
    print("${response.body}");
    return response;
  }

  //----EXAMEN ORINA----
  Future<List<ExamenOrinaGeneral>> getExamenesOrina(idBeneficiario) async {
    String path =
        "/examenOrina/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      ExamenesOrina listaExamenes =
          new ExamenesOrina.fromJsonList(decodedJsonMap);
      return listaExamenes.examenesOrina;
    } else {
      return null;
    }
  }

  Future<ExamenOrina> getExamenOrina(idExamenOrina) async {
    String path = "/examenOrina/" + idExamenOrina.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      ExamenOrina analisis;
      for (var item in decodedJsonMap) {
        analisis = new ExamenOrina.fromJsonMap(item);
      }
      return analisis;
    } else {
      return null;
    }
  }

  //----DEPURACION CREATININA----
  Future<List<DepuracionCreatininaGeneral>> getDepuracionesCreatinina(idBeneficiario) async {
    String path =
        "/depuracionCreatinina/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      DepuracionesCreatinina listaDepuraciones =
          new DepuracionesCreatinina.fromJsonList(decodedJsonMap);
      return listaDepuraciones.depuracionesCreatinina;
    } else {
      return null;
    }
  }

  Future<DepuracionCreatinina> getDepuracionCreatinina(idDepuracionCreatinina) async {
    String path = "/depuracionCreatinina/" + idDepuracionCreatinina.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      DepuracionCreatinina analisis;
      for (var item in decodedJsonMap) {
        analisis = new DepuracionCreatinina.fromJsonMap(item);
      }
      return analisis;
    } else {
      return null;
    }
  }

  //----QUIMICA SANGUINEA----
  Future<List<QuimicaSanguineaGeneral>> getQuimicasSanguineas(idBeneficiario) async {
    String path =
        "/quimicaSanguinea/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      QuimicasSanguineas listaAnalisis =
          new QuimicasSanguineas.fromJsonList(decodedJsonMap);
      return listaAnalisis.quimicasSanguineas;
    } else {
      return null;
    }
  }

  Future<QuimicaSanguinea> getQuimicaSanguinea(idQuimicaSanguinea) async {
    String path = "/quimicaSanguinea/" + idQuimicaSanguinea.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      QuimicaSanguinea analisis;
      for (var item in decodedJsonMap) {
        analisis = new QuimicaSanguinea.fromJsonMap(item);
      }
      return analisis;
    } else {
      return null;
    }
  }

  //----MICROALBUMINURIA----
  Future<List<MicroalbuminuriaGeneral>> getMicroalbuminurias(idBeneficiario) async {
    String path =
        "/microalbuminuria/beneficiario/" + idBeneficiario.toString();
    String uri = ip + baseUrl + path;

    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      Microalbuminurias listaAnalisis =
          new Microalbuminurias.fromJsonList(decodedJsonMap);
      return listaAnalisis.microalbuminurias;
    } else {
      return null;
    }
  }

  Future<Microalbuminuria> getMicroalbuminuria(idMicroalbuminuria) async {
    String path = "/microalbuminuria/" + idMicroalbuminuria.toString();
    String uri = ip + baseUrl + path;
    print(uri);
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      print(decodedJsonMap);
      Microalbuminuria analisis;
      for (var item in decodedJsonMap) {
        analisis = new Microalbuminuria.fromJsonMap(item);
      }
      return analisis;
    } else {
      return null;
    }
  }

  //----JORNADAS-----
  Future<List<Jornada>> getAllJornadas() async {
    String path = "/jornadas";
    String uri = ip + baseUrl + path;
    http.Response resp = await http.get(uri);
    if (resp.statusCode == 200) {
      final decodedJsonMap = json.decode(resp.body);
      Jornadas listaJornadas = new Jornadas.fromJsonList(decodedJsonMap);
      return listaJornadas.jornadas;
    } else {
      return null;
    }
  }
}
