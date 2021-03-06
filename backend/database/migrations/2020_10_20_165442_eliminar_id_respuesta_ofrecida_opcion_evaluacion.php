<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class EliminarIdRespuestaOfrecidaOpcionEvaluacion extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        if (Schema::hasColumn('opcion_evaluacion', 'idRespuestaOfrecida'))
        {
            Schema::table('opcion_evaluacion', function (Blueprint $table) {
                $table->dropForeign(['idRespuestaOfrecida']);
                $table->dropColumn('idRespuestaOfrecida');
            });
        }
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        
    }
}
