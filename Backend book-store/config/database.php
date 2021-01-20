<?php
        return [
            'default' => 'mongodb',
            'connections' => [

 

                'mongodb' => [
                    'driver' => 'mongodb',
                    'host' => 'localhost',
                    'port' => 27017,
                    'database' => 'book-store',
                    'username' => '',
                    'password' => '',
                    'options' => [
                        'database' => 'admin' // sets the authentication database required by mongo 3
                    ],
                   

                ],

                
            ]
        ];
        ?>