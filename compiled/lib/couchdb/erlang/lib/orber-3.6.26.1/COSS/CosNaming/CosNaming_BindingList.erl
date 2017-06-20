%%------------------------------------------------------------
%%
%% Implementation stub file
%% 
%% Target: CosNaming_BindingList
%% Source: /private/tmp/erlang-Y5fv/otp-OTP_R16B02/lib/orber/COSS/CosNaming/cos_naming.idl
%% IC vsn: 4.3.3
%% 
%% This file is automatically generated. DO NOT EDIT IT.
%%
%%------------------------------------------------------------

-module('CosNaming_BindingList').
-ic_compiled("4_3_3").


-include("CosNaming.hrl").

-export([tc/0,id/0,name/0]).



%% returns type code
tc() -> {tk_sequence,
            {tk_struct,"IDL:omg.org/CosNaming/Binding:1.0","Binding",
                [{"binding_name",
                  {tk_sequence,
                      {tk_struct,"IDL:omg.org/CosNaming/NameComponent:1.0",
                          "NameComponent",
                          [{"id",{tk_string,0}},{"kind",{tk_string,0}}]},
                      0}},
                 {"binding_type",
                  {tk_enum,"IDL:omg.org/CosNaming/BindingType:1.0",
                      "BindingType",
                      ["nobject","ncontext"]}}]},
            0}.

%% returns id
id() -> "IDL:omg.org/CosNaming/BindingList:1.0".

%% returns name
name() -> "CosNaming_BindingList".


