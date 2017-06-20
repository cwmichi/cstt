%%------------------------------------------------------------
%%
%% Implementation stub file
%% 
%% Target: CosNaming_NamingContext_NotFound
%% Source: /private/tmp/erlang-Y5fv/otp-OTP_R16B02/lib/orber/COSS/CosNaming/cos_naming.idl
%% IC vsn: 4.3.3
%% 
%% This file is automatically generated. DO NOT EDIT IT.
%%
%%------------------------------------------------------------

-module('CosNaming_NamingContext_NotFound').
-ic_compiled("4_3_3").


-include("CosNaming_NamingContext.hrl").

-export([tc/0,id/0,name/0]).



%% returns type code
tc() -> {tk_except,"IDL:omg.org/CosNaming/NamingContext/NotFound:1.0",
            "NotFound",
            [{"why",
              {tk_enum,
                  "IDL:omg.org/CosNaming/NamingContext/NotFoundReason:1.0",
                  "NotFoundReason",
                  ["missing_node","not_context","not_object"]}},
             {"rest_of_name",
              {tk_sequence,
                  {tk_struct,"IDL:omg.org/CosNaming/NameComponent:1.0",
                      "NameComponent",
                      [{"id",{tk_string,0}},{"kind",{tk_string,0}}]},
                  0}}]}.

%% returns id
id() -> "IDL:omg.org/CosNaming/NamingContext/NotFound:1.0".

%% returns name
name() -> "CosNaming_NamingContext_NotFound".



